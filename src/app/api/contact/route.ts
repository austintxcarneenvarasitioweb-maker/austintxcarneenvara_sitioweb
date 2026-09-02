import { Resend } from 'resend'
import { z } from 'zod'
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

type ContactPayload = z.infer<typeof contactSchema>

function normalizePreferredContact(value?: string): 'email' | 'phone' | 'whatsapp' | undefined {
  if (!value) return undefined
  const key = value.trim().toLowerCase()
  if (key === 'email') return 'email'
  if (key === 'phone' || key === 'teléfono' || key === 'telefono') return 'phone'
  if (key === 'whatsapp') return 'whatsapp'
  return undefined
}

function wrapEmail(inner: string) {
  return `
    <div style="margin:0;padding:32px 16px;background:#1a0e10;font-family:Georgia,serif;">
      <div style="max-width:520px;margin:0 auto;color:#ede0cc;">
        <p style="margin:0 0 8px;color:#c84914;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;font-family:Arial,sans-serif;">Austin TX · Carne en Vara</p>
        ${inner}
        <p style="margin:28px 0 0;color:rgba(237,224,204,0.45);font-size:12px;font-family:Arial,sans-serif;">Austin, Texas</p>
      </div>
    </div>
  `
}

function customerConfirmationHtml(data: ContactPayload) {
  const es = data.locale === 'es'
  const isCatering = data.source === 'catering'
  const greeting = es ? `Hola ${data.fullName},` : `Hi ${data.fullName},`
  const title = es
    ? isCatering
      ? 'Recibimos tu solicitud de catering'
      : 'Recibimos tu mensaje'
    : isCatering
      ? 'We received your catering request'
      : 'We received your message'
  const body = es
    ? isCatering
      ? 'Gracias por escribirnos. Revisamos los detalles de tu evento y te contactamos en un plazo de 24 horas.'
      : 'Gracias por escribirnos. Te respondemos lo antes posible.'
    : isCatering
      ? "Thanks for reaching out. We'll review your event details and get back to you within 24 hours."
      : "Thanks for reaching out. We'll get back to you as soon as we can."
  const closing = es ? 'Con fuego,' : 'With fire,'

  return wrapEmail(`
    <h1 style="margin:0 0 16px;font-weight:400;font-size:28px;line-height:1.2;">${title}</h1>
    <p style="margin:0 0 12px;font-size:16px;">${greeting}</p>
    <p style="margin:0 0 20px;color:rgba(237,224,204,0.75);font-size:15px;line-height:1.7;font-family:Arial,sans-serif;">${body}</p>
    <p style="margin:0;color:rgba(237,224,204,0.75);font-size:15px;font-family:Arial,sans-serif;">${closing}<br/>Austin TX Carne en Vara</p>
  `)
}

function businessNotificationHtml(
  data: ContactPayload,
  preferredContact?: 'email' | 'phone' | 'whatsapp',
) {
  const row = (label: string, value?: string) =>
    value ? `<p style="margin:0 0 8px;font-family:Arial,sans-serif;"><b>${label}:</b> ${value}</p>` : ''

  return wrapEmail(`
    <h1 style="margin:0 0 16px;font-weight:400;font-size:26px;">
      ${data.source === 'catering' ? 'Nueva cotización de catering' : 'Nuevo mensaje de contacto'}
    </h1>
    ${row('Nombre', data.fullName)}
    ${row('Email', data.email)}
    ${row('Teléfono', data.phone)}
    ${row('Empresa', data.company)}
    ${row('Fecha', data.eventDate)}
    ${row('Invitados', data.guestCount)}
    ${row('Ubicación', data.location)}
    ${row('Paquete', data.package)}
    ${row('Presupuesto', data.budget)}
    ${row('Contacto preferido', preferredContact)}
    ${row('Mensaje', data.notes ?? data.message ?? '—')}
  `)
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
          notes: data.notes ?? data.message,
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

      if (toEmail) {
        const staff = await resend.emails.send({
          from,
          to: toEmail,
          replyTo: data.email,
          subject:
            data.source === 'catering'
              ? `Nueva cotización: ${data.fullName}`
              : `Nuevo contacto: ${data.fullName}`,
          html: businessNotificationHtml(data, preferredContact),
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
        html: customerConfirmationHtml(data),
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
