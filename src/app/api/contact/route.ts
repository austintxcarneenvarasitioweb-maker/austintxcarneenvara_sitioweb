import { Resend } from 'resend'
import { z } from 'zod'
import { businessNotificationHtml, customerConfirmationHtml, getEmailLogoAttachment } from '@/lib/email-templates'
import { getPayloadClient } from '@/lib/payload'

const contactSchema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  message: z.string().optional(),
  company: z.string().optional(),
  eventDate: z.string().optional(),
  guestCount: z.string().optional(),
  location: z.string().optional(),
  package: z.string().optional(),
  budget: z.string().optional(),
  notes: z.string().optional(),
  preferredContact: z.string().optional(),
  source: z.enum(['contact', 'catering']).default('contact'),
  locale: z.enum(['en', 'es']).optional(),
})

function normalizePreferredContact(value?: string): 'email' | 'phone' | 'whatsapp' | undefined {
  if (!value) return undefined
  const key = value.trim().toLowerCase()
  if (key === 'email') return 'email'
  if (key === 'phone' || key === 'teléfono' || key === 'telefono') return 'phone'
  if (key === 'whatsapp') return 'whatsapp'
  return undefined
}

export async function POST(req: Request): Promise<Response> {
  try {
    const body = (await req.json()) as unknown
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return Response.json(
        { success: false, message: 'Invalid form data. Please check your fields.' },
        { status: 400 },
      )
    }

    const data = result.data
    const preferredContact = normalizePreferredContact(data.preferredContact)
    const notes = data.notes ?? data.message

    try {
      const payload = await getPayloadClient()
      await payload.create({
        collection: 'quote-requests',
        data: {
          fullName: data.fullName,
          company: data.company,
          email: data.email,
          phone: data.phone,
          eventDate: data.eventDate,
          guestCount: data.guestCount,
          location: data.location,
          package: data.package,
          budget: data.budget,
          notes,
          preferredContact,
          source: data.source,
        },
        overrideAccess: true,
      })
    } catch (dbError) {
      console.warn('Payload save skipped (DB may not be configured):', dbError)
    }

    const apiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.RESEND_TO_EMAIL
    const from = process.env.RESEND_FROM ?? 'Carnes en Vara <contacto@resend.dev>'

    if (apiKey) {
      const resend = new Resend(apiKey)
      let logo
      try {
        logo = await getEmailLogoAttachment()
      } catch (logoError) {
        console.warn('Email logo attachment skipped:', logoError)
      }
      const attachments = logo ? [logo] : undefined

      if (toEmail) {
        const staff = await resend.emails.send({
          from,
          to: toEmail,
          replyTo: data.email,
          subject:
            data.source === 'catering'
              ? `Nueva cotización: ${data.fullName}`
              : `Nuevo contacto: ${data.fullName}`,
          html: businessNotificationHtml({
            ...data,
            notes,
            preferredContact,
          }),
          attachments,
        })
        if (staff.error) console.error('Staff email failed:', staff.error)
      }

      const customer = await resend.emails.send({
        from,
        to: data.email,
        replyTo: toEmail || undefined,
        subject:
          data.locale === 'es'
            ? data.source === 'catering'
              ? 'Recibimos tu solicitud de catering — Austin TX Carne en Vara'
              : 'Recibimos tu mensaje — Austin TX Carne en Vara'
            : data.source === 'catering'
              ? 'We received your catering request — Austin TX Carne en Vara'
              : 'We received your message — Austin TX Carne en Vara',
        html: customerConfirmationHtml({
          fullName: data.fullName,
          source: data.source,
          locale: data.locale,
        }),
        attachments,
      })
      if (customer.error) console.error('Customer confirmation email failed:', customer.error)
    }

    return Response.json({
      success: true,
      message: 'Message sent! We will contact you soon.',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return Response.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 },
    )
  }
}
