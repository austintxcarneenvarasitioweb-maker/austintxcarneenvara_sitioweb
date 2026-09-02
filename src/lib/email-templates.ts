import { getSiteUrl } from '@/lib/site-url'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

/** Inline CID so clients do not fetch the logo from a remote URL. */
export const EMAIL_LOGO_CID = 'logo'

const COLORS = {
  bg: '#140a08',
  card: '#1a0e10',
  border: '#3a1e10',
  cream: '#ede0cc',
  gold: '#d9c4a3',
  muted: 'rgba(237,224,204,0.62)',
  faint: 'rgba(237,224,204,0.42)',
  orange: '#c84914',
}

const FONT_SERIF = "Trocchi, Georgia, 'Times New Roman', serif"
const FONT_SANS = 'Arial, Helvetica, sans-serif'

function escapeHtml(value?: string) {
  if (!value) return ''
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function logoUrl() {
  return `cid:${EMAIL_LOGO_CID}`
}

function brandHeader() {
  const src = logoUrl()
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;">
      <tr>
        <td style="vertical-align:middle;padding-right:12px;width:44px;">
          <img src="${src}" alt="" width="44" height="44" style="display:block;width:44px;height:44px;border-radius:50%;border:0;outline:none;text-decoration:none;" />
        </td>
        <td style="vertical-align:middle;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center" style="font-family:${FONT_SERIF};color:${COLORS.gold};font-size:15px;letter-spacing:0.02em;line-height:1;text-transform:uppercase;white-space:nowrap;">
                AUSTIN TX
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:4px 0 5px;font-size:0;line-height:0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="118">
                  <tr>
                    <td style="height:2px;background-color:${COLORS.gold};font-size:0;line-height:0;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="font-family:${FONT_SERIF};color:${COLORS.gold};font-size:8px;letter-spacing:0.12em;line-height:1;text-transform:uppercase;white-space:nowrap;">
                <span style="font-size:7px;vertical-align:2px;">★</span>
                &nbsp;CARNE EN VARA&nbsp;
                <span style="font-size:7px;vertical-align:2px;">★</span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `
}

function wrapEmail(inner: string, options?: { locale?: 'en' | 'es'; preheader?: string }) {
  const lang = options?.locale === 'en' ? 'en' : 'es'
  const preheader = options?.preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${COLORS.bg};opacity:0;">${escapeHtml(options.preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>`
    : ''
  const footerLine =
    options?.locale === 'en' ? 'Austin, Texas · Live wood fire' : 'Austin, Texas · Fuego vivo'

  return `<!DOCTYPE html>
<html lang="${lang}" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <title>Austin TX Carne en Vara</title>
  <link href="https://fonts.googleapis.com/css2?family=Trocchi&display=swap" rel="stylesheet" />
  <style>
    :root { color-scheme: dark; }
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    @media (max-width: 620px) {
      .email-pad { padding: 28px 20px 32px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.bg};background:${COLORS.bg};">
  ${preheader}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${COLORS.bg};background:${COLORS.bg};padding:36px 16px;">
    <tr>
      <td align="center">
        <!--[if mso]>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560"><tr><td>
        <![endif]-->
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;background-color:${COLORS.card};background:${COLORS.card};border:1px solid ${COLORS.border};">
          <tr>
            <td style="height:3px;background-color:${COLORS.orange};background:${COLORS.orange};font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td class="email-pad" style="padding:36px 32px 40px;color:${COLORS.cream};">
              ${brandHeader()}
              ${inner}
            </td>
          </tr>
        </table>
        <p style="margin:22px 0 0;font-family:${FONT_SANS};font-size:11px;letter-spacing:0.14em;color:${COLORS.faint};text-align:center;text-transform:uppercase;">
          ${footerLine}
        </p>
        <!--[if mso]>
        </td></tr></table>
        <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`
}

function ctaButton(href: string, label: string) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 0;">
      <tr>
        <td bgcolor="${COLORS.orange}" style="background-color:${COLORS.orange};background:${COLORS.orange};">
          <a href="${href}" style="display:inline-block;padding:13px 24px;font-family:${FONT_SANS};font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#ffffff;text-decoration:none;font-weight:700;">
            ${label}
          </a>
        </td>
      </tr>
    </table>
  `
}

export function customerConfirmationHtml(input: {
  fullName: string
  source: 'contact' | 'catering'
  locale?: 'en' | 'es'
}) {
  const es = input.locale === 'es'
  const isCatering = input.source === 'catering'
  const name = escapeHtml(input.fullName)
  const site = getSiteUrl()
  const title = es
    ? isCatering
      ? 'Recibimos tu solicitud'
      : 'Recibimos tu mensaje'
    : isCatering
      ? 'We received your request'
      : 'We received your message'
  const kicker = es
    ? isCatering
      ? 'Catering y eventos'
      : 'Contacto'
    : isCatering
      ? 'Catering & events'
      : 'Contact'
  const greeting = es ? `Hola ${name},` : `Hi ${name},`
  const body = es
    ? isCatering
      ? 'Gracias por escribirnos. Revisamos los detalles de tu evento y te contactamos en un plazo de 24 horas.'
      : 'Gracias por escribirnos. Te respondemos lo antes posible.'
    : isCatering
      ? "Thanks for reaching out. We'll review your event details and get back to you within 24 hours."
      : "Thanks for reaching out. We'll get back to you as soon as we can."
  const closing = es ? 'Con fuego,' : 'With fire,'
  const cta = es ? 'Visitar el sitio' : 'Visit the site'
  const preheader = es
    ? isCatering
      ? 'Recibimos tu solicitud de catering. Te contactamos en 24 horas.'
      : 'Recibimos tu mensaje. Te respondemos pronto.'
    : isCatering
      ? 'We received your catering request. We’ll be in touch within 24 hours.'
      : 'We received your message. We’ll get back to you soon.'

  return wrapEmail(
    `
    <p style="margin:0 0 10px;font-family:${FONT_SANS};font-size:11px;letter-spacing:0.32em;text-transform:uppercase;color:${COLORS.orange};">${kicker}</p>
    <h1 style="margin:0 0 22px;font-family:${FONT_SERIF};font-weight:400;font-size:28px;line-height:1.2;color:${COLORS.cream};">${title}</h1>
    <p style="margin:0 0 14px;font-family:${FONT_SERIF};font-size:17px;color:${COLORS.cream};">${greeting}</p>
    <p style="margin:0;font-family:${FONT_SANS};font-size:15px;line-height:1.75;color:${COLORS.muted};">${body}</p>
    ${ctaButton(site, cta)}
    <p style="margin:32px 0 0;font-family:${FONT_SANS};font-size:14px;line-height:1.6;color:${COLORS.muted};">
      ${closing}<br />
      <span style="color:${COLORS.gold};font-family:${FONT_SERIF};letter-spacing:0.04em;">Austin TX Carne en Vara</span>
    </p>
  `,
    { locale: input.locale, preheader },
  )
}

function detailRow(label: string, value?: string, last = false) {
  if (!value) return ''
  const border = last ? 'none' : `1px solid ${COLORS.border}`
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:${border};vertical-align:top;width:38%;">
        <div style="font-family:${FONT_SANS};font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:${COLORS.faint};">${label}</div>
      </td>
      <td style="padding:12px 0;border-bottom:${border};vertical-align:top;font-family:${FONT_SANS};font-size:14px;line-height:1.5;color:${COLORS.cream};">
        ${escapeHtml(value)}
      </td>
    </tr>
  `
}

export function businessNotificationHtml(input: {
  fullName: string
  email: string
  source: 'contact' | 'catering'
  phone?: string
  company?: string
  eventDate?: string
  guestCount?: string
  location?: string
  package?: string
  budget?: string
  preferredContact?: 'email' | 'phone' | 'whatsapp'
  notes?: string
}) {
  const isCatering = input.source === 'catering'
  const title = isCatering ? 'Nueva cotización de catering' : 'Nuevo mensaje de contacto'
  const kicker = isCatering ? 'Solicitud de catering' : 'Formulario de contacto'
  const contactLabel =
    input.preferredContact === 'phone'
      ? 'Teléfono'
      : input.preferredContact === 'whatsapp'
        ? 'WhatsApp'
        : input.preferredContact === 'email'
          ? 'Email'
          : undefined

  const rows = [
    detailRow('Nombre', input.fullName),
    detailRow('Email', input.email),
    detailRow('Teléfono', input.phone),
    detailRow('Empresa', input.company),
    detailRow('Fecha', input.eventDate),
    detailRow('Invitados', input.guestCount),
    detailRow('Ubicación', input.location),
    detailRow('Paquete', input.package),
    detailRow('Presupuesto', input.budget),
    detailRow('Contacto preferido', contactLabel),
    detailRow('Mensaje', input.notes || '—', true),
  ].join('')

  const adminUrl = `${getSiteUrl()}/admin/collections/quote-requests`
  const preheader = `${input.fullName} · ${input.email}`

  return wrapEmail(
    `
    <p style="margin:0 0 10px;font-family:${FONT_SANS};font-size:11px;letter-spacing:0.32em;text-transform:uppercase;color:${COLORS.orange};">${kicker}</p>
    <h1 style="margin:0 0 8px;font-family:${FONT_SERIF};font-weight:400;font-size:26px;line-height:1.2;color:${COLORS.cream};">${title}</h1>
    <p style="margin:0 0 22px;font-family:${FONT_SANS};font-size:14px;line-height:1.6;color:${COLORS.muted};">
      ${escapeHtml(input.fullName)} · ${escapeHtml(input.email)}
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${rows}
    </table>
    ${ctaButton(adminUrl, 'Ver en el admin')}
  `,
    { locale: 'es', preheader },
  )
}

export async function getEmailLogoAttachment() {
  const localPath = path.join(process.cwd(), 'public', 'images', 'LOGO.png')
  try {
    const content = await readFile(localPath)
    return {
      filename: 'logo.png',
      content,
      contentType: 'image/png',
      contentId: EMAIL_LOGO_CID,
    }
  } catch {
    const origin = getSiteUrl()
    const res = await fetch(`${origin}/images/LOGO.png`)
    if (!res.ok) throw new Error(`Logo fetch failed: ${res.status}`)
    return {
      filename: 'logo.png',
      content: Buffer.from(await res.arrayBuffer()),
      contentType: 'image/png',
      contentId: EMAIL_LOGO_CID,
    }
  }
}
