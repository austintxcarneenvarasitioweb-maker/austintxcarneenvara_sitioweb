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
})

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
          preferredContact: data.preferredContact as 'email' | 'phone' | undefined,
          source: data.source,
        },
        overrideAccess: true,
      })
    } catch (dbError) {
      console.warn('Payload save skipped (DB may not be configured):', dbError)
    }

    const toEmail = process.env.RESEND_TO_EMAIL
    if (process.env.RESEND_API_KEY && toEmail) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: process.env.RESEND_FROM ?? 'Carnes en Vara <contacto@resend.dev>',
        to: toEmail,
        subject: `New ${data.source === 'catering' ? 'catering quote' : 'contact'}: ${data.fullName}`,
        html: `
          <h2>New ${data.source} submission</h2>
          <p><b>Name:</b> ${data.fullName}</p>
          <p><b>Email:</b> ${data.email}</p>
          ${data.phone ? `<p><b>Phone:</b> ${data.phone}</p>` : ''}
          ${data.company ? `<p><b>Company:</b> ${data.company}</p>` : ''}
          ${data.eventDate ? `<p><b>Event Date:</b> ${data.eventDate}</p>` : ''}
          ${data.guestCount ? `<p><b>Guests:</b> ${data.guestCount}</p>` : ''}
          ${data.location ? `<p><b>Location:</b> ${data.location}</p>` : ''}
          ${data.package ? `<p><b>Package:</b> ${data.package}</p>` : ''}
          ${data.budget ? `<p><b>Budget:</b> ${data.budget}</p>` : ''}
          <p><b>Message:</b> ${data.notes ?? data.message ?? '—'}</p>
        `,
      })
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
