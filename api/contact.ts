import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT_EMAIL = 'kontakt@raum-kraft.de';
// Absender-Adresse: muss zu einer bei Resend verifizierten Domain gehören
// (z. B. formular@raum-kraft.de, sobald die Domain bei Resend eingetragen ist).
const FROM_EMAIL = 'formular@raum-kraft.de';

interface ContactAttachment {
  filename: string;
  contentType: string;
  base64: string;
}

interface ContactFormPayload {
  beschreibung?: string;
  groesse?: string;
  zeitraum?: string;
  ort?: string;
  name: string;
  email: string;
  telefon: string;
  dsgvo: boolean;
  attachments?: ContactAttachment[];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Methode nicht erlaubt' });
    return;
  }

  const body = req.body as ContactFormPayload;

  // Serverseitige Basis-Validierung — Client-Validierung allein reicht nie als Schutz.
  if (!body?.name || !body?.email || !body?.telefon || !body?.dsgvo) {
    res.status(400).json({ error: 'Pflichtfelder fehlen (Name, E-Mail, Telefon, DSGVO-Zustimmung).' });
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(body.email)) {
    res.status(400).json({ error: 'Ungültige E-Mail-Adresse.' });
    return;
  }

  // Auf 3 Anhänge begrenzen, auch wenn das Frontend das schon tut.
  const attachments = (body.attachments ?? []).slice(0, 3).map((a) => ({
    filename: a.filename,
    content: a.base64
  }));

  const htmlBody = `
    <h2>Neue Kontaktanfrage über die Website</h2>
    <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
    <p><strong>E-Mail:</strong> ${escapeHtml(body.email)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(body.telefon)}</p>
    ${body.beschreibung ? `<p><strong>Was wird gebraucht:</strong><br>${escapeHtml(body.beschreibung)}</p>` : ''}
    ${body.groesse ? `<p><strong>Größe:</strong> ${escapeHtml(body.groesse)}</p>` : ''}
    ${body.zeitraum ? `<p><strong>Zeitraum:</strong> ${escapeHtml(body.zeitraum)}</p>` : ''}
    ${body.ort ? `<p><strong>Ort:</strong> ${escapeHtml(body.ort)}</p>` : ''}
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: RECIPIENT_EMAIL,
      replyTo: body.email,
      subject: `Neue Kontaktanfrage von ${body.name}`,
      html: htmlBody,
      attachments
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Fehler beim E-Mail-Versand:', err);
    res.status(500).json({ error: 'E-Mail konnte nicht gesendet werden.' });
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
