import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { KontaktService } from '../../core/services/kontakt.service';

interface FotoVorschau {
  name: string;
  dataUrl: string;
}

@Component({
  selector: 'app-kontaktformular',
  imports: [ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './kontaktformular.html',
  styleUrl: './kontaktformular.scss',
})
export class Kontaktformular {
  private readonly fb = inject(FormBuilder);
  private readonly kontaktService = inject(KontaktService);

  protected readonly maxFotos = 3;
  protected readonly totalSteps = 3;

  // Ziel-Dateigröße NACH Komprimierung, in Bytes (~1 MB), damit 3 Fotos
  // als Base64-Anhang sicher unter dem Vercel-Body-Limit (4.5 MB) bleiben.
  private readonly targetMaxBytes = 1_000_000;
  private readonly maxDimensionPx = 1600;

  protected readonly currentStep = signal(1);
  protected readonly isSubmitting = signal(false);
  protected readonly submitSuccess = signal(false);
  protected readonly submitError = signal<string | null>(null);
  protected readonly fotoVorschauen = signal<FotoVorschau[]>([]);

  private fotoDateien: File[] = [];
  private objectUrls: string[] = [];

  protected readonly form = this.fb.group({
    // Schritt 1 – optional
    beschreibung: [''],
    // Schritt 2 – optional
    groesse: [''],
    zeitraum: [''],
    ort: [''],
    // Schritt 3 – Pflichtfelder
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    telefon: ['', Validators.required],
    dsgvo: [false, Validators.requiredTrue],
  });

  protected istSchritt3Ungueltig(): boolean {
    const { name, email, telefon, dsgvo } = this.form.controls;
    return name.invalid || email.invalid || telefon.invalid || dsgvo.invalid;
  }

  protected naechsterSchritt(): void {
    if (this.currentStep() < this.totalSteps) {
      this.currentStep.update((step) => step + 1);
    }
  }

  protected vorherigerSchritt(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update((step) => step - 1);
    }
  }

  protected async onFotosAusgewaehlt(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const eingehend = Array.from(input.files);
    const freiePlaetze = this.maxFotos - this.fotoDateien.length;
    const hinzuzufuegen = eingehend.slice(0, freiePlaetze);

    for (const datei of hinzuzufuegen) {
      if (!datei.type.startsWith('image/')) continue;
      try {
        const komprimiert = await this.bildKomprimieren(datei);
        this.fotoDateien.push(komprimiert);
        const url = URL.createObjectURL(komprimiert);
        this.objectUrls.push(url);
        this.fotoVorschauen.update((vorschauen) => [...vorschauen, { name: datei.name, dataUrl: url }]);
      } catch (err) {
        console.error('Fehler bei der Bildkomprimierung:', err);
      }
    }

    input.value = '';
  }

  protected fotoEntfernen(index: number): void {
    this.fotoDateien.splice(index, 1);
    const [entfernt] = this.objectUrls.splice(index, 1);
    if (entfernt) {
      URL.revokeObjectURL(entfernt);
    }
    this.fotoVorschauen.update((vorschauen) => vorschauen.filter((_, i) => i !== index));
  }

  /**
   * Verkleinert ein Bild clientseitig (max. Kantenlänge + JPEG-Qualität),
   * damit der spätere Mailversand als Anhang nicht an Größenlimits scheitert.
   * Reduziert die Qualität schrittweise, bis targetMaxBytes unterschritten wird.
   */
  private async bildKomprimieren(datei: File): Promise<File> {
    const bild = await this.bildLaden(datei);

    let breite = bild.width;
    let hoehe = bild.height;
    if (breite > this.maxDimensionPx || hoehe > this.maxDimensionPx) {
      const verhaeltnis = Math.min(this.maxDimensionPx / breite, this.maxDimensionPx / hoehe);
      breite = Math.round(breite * verhaeltnis);
      hoehe = Math.round(hoehe * verhaeltnis);
    }

    const canvas = document.createElement('canvas');
    canvas.width = breite;
    canvas.height = hoehe;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas-Kontext nicht verfügbar');
    }
    ctx.drawImage(bild, 0, 0, breite, hoehe);

    let qualitaet = 0.8;
    let blob = await this.canvasZuBlob(canvas, qualitaet);

    while (blob.size > this.targetMaxBytes && qualitaet > 0.3) {
      qualitaet -= 0.15;
      blob = await this.canvasZuBlob(canvas, qualitaet);
    }

    return new File([blob], this.zuJpegName(datei.name), { type: 'image/jpeg' });
  }

  private bildLaden(datei: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(datei);
    });
  }

  private canvasZuBlob(canvas: HTMLCanvasElement, qualitaet: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Komprimierung fehlgeschlagen'))),
        'image/jpeg',
        qualitaet,
      );
    });
  }

  private zuJpegName(originalName: string): string {
    const basis = originalName.replace(/\.[^.]+$/, '');
    return `${basis}.jpg`;
  }

  private dateiZuBase64(datei: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Data-URL-Präfix ("data:image/jpeg;base64,") entfernen
        resolve(result.split(',')[1] ?? '');
      };
      reader.onerror = reject;
      reader.readAsDataURL(datei);
    });
  }

  protected async onSubmit(): Promise<void> {
    if (this.istSchritt3Ungueltig()) {
      this.form.markAllAsTouched();
      this.currentStep.set(3);
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);

    try {
      const attachments = await Promise.all(
        this.fotoDateien.map(async (datei) => ({
          filename: datei.name,
          contentType: datei.type || 'image/jpeg',
          base64: await this.dateiZuBase64(datei),
        })),
      );

      const { name, email, telefon, dsgvo, beschreibung, groesse, zeitraum, ort } = this.form.getRawValue();

      await this.kontaktService.sendeAnfrage({
        beschreibung: beschreibung ?? '',
        groesse: groesse ?? '',
        zeitraum: zeitraum ?? '',
        ort: ort ?? '',
        name: name ?? '',
        email: email ?? '',
        telefon: telefon ?? '',
        dsgvo: dsgvo ?? false,
        attachments,
      });

      this.submitSuccess.set(true);
    } catch (err) {
      console.error(err);
      this.submitError.set(
        'Beim Senden ist ein Fehler aufgetreten. Bitte versuche es später erneut oder ruf uns direkt an.',
      );
    } finally {
      this.isSubmitting.set(false);
    }
  }

  protected zuruecksetzen(): void {
    this.form.reset({ dsgvo: false });
    this.fotoDateien = [];
    this.objectUrls.forEach((url) => URL.revokeObjectURL(url));
    this.objectUrls = [];
    this.fotoVorschauen.set([]);
    this.currentStep.set(1);
    this.submitSuccess.set(false);
    this.submitError.set(null);
  }
}
