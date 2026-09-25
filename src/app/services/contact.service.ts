import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface ContactAttachment {
  filename: string;
  contentType: string;
  base64: string;
}

export interface ContactFormPayload {
  beschreibung: string;
  groesse: string;
  zeitraum: string;
  ort: string;
  name: string;
  email: string;
  telefon: string;
  dsgvo: boolean;
  attachments: ContactAttachment[];
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  // Frontend und API liegen auf derselben Vercel-Domain, daher genügt ein relativer Pfad.
  private readonly endpoint = '/api/contact';

  constructor(private http: HttpClient) {}

  sendContactForm(payload: ContactFormPayload): Promise<void> {
    return firstValueFrom(this.http.post<void>(this.endpoint, payload));
  }
}
