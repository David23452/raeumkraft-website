import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface KontaktAnhang {
  filename: string;
  contentType: string;
  base64: string;
}

export interface KontaktAnfrage {
  beschreibung: string;
  groesse: string;
  zeitraum: string;
  ort: string;
  name: string;
  email: string;
  telefon: string;
  dsgvo: boolean;
  attachments: KontaktAnhang[];
}

@Injectable({ providedIn: 'root' })
export class KontaktService {
  private readonly http = inject(HttpClient);

  // Frontend und API liegen auf derselben Vercel-Domain, daher genügt ein relativer Pfad.
  private readonly endpoint = '/api/kontakt';

  sendeAnfrage(anfrage: KontaktAnfrage): Promise<void> {
    return firstValueFrom(this.http.post<void>(this.endpoint, anfrage));
  }
}
