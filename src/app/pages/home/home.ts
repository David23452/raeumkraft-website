import { DOCUMENT } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { UNTERNEHMEN } from '../../core/data/unternehmen';
import { KleinauftraegeSektion } from './sections/kleinauftraege-sektion/kleinauftraege-sektion';
import { LeistungenSektion } from './sections/leistungen-sektion/leistungen-sektion';
import { PreiseSektion } from './sections/preise-sektion/preise-sektion';
import { ProblemSektion } from './sections/problem-sektion/problem-sektion';
import { TrustLeiste } from './sections/trust-leiste/trust-leiste';

interface GalerieBild {
  src: string;
  alt: string;
}

interface Testimonial {
  quote: string;
  name: string;
  context: string;
}

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    NgOptimizedImage,
    TrustLeiste,
    ProblemSektion,
    LeistungenSektion,
    KleinauftraegeSektion,
    PreiseSektion,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:resize)': 'galerieAktualisieren()',
  },
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly galerieBilder: GalerieBild[] = [
    { src: '/images/1vh.webp', alt: 'Abgeschlossene Entrümpelung – Projekt 1' },
    { src: '/images/2vh.webp', alt: 'Abgeschlossene Entrümpelung – Projekt 2' },
    { src: '/images/3vh.webp', alt: 'Abgeschlossene Entrümpelung – Projekt 3' },
    { src: '/images/4vh.webp', alt: 'Abgeschlossene Entrümpelung – Projekt 4' },
  ];

  private readonly galerieTrack = viewChild.required<ElementRef<HTMLElement>>('galerieTrack');

  // Anzahl der Scroll-Positionen hängt davon ab, wie viele Bilder gleichzeitig sichtbar sind
  // (Desktop 3, Tablet 2, Mobil 1) – wird erst im Browser gemessen.
  protected readonly seitenAnzahl = signal(1);
  protected readonly aktiveSeite = signal(0);
  protected readonly seiten = computed(() =>
    Array.from({ length: this.seitenAnzahl() }, (_, i) => i),
  );

  protected readonly testimonials: Testimonial[] = [
    {
      quote:
        'Der ganze Keller war innerhalb eines Tages leer – schnell, freundlich und ohne versteckte Kosten.',
      name: 'Sabine Huber',
      context: 'Kellerentrümpelung, Pfaffenhofen',
    },
    {
      quote:
        'Angebot per WhatsApp-Fotos war super unkompliziert. Der Festpreis hat exakt gestimmt.',
      name: 'Michael Brandner',
      context: 'Wohnungsauflösung, Ingolstadt',
    },
    {
      quote:
        'Sehr rücksichtsvoller Umgang mit den Sachen meiner Eltern. Kann ich nur weiterempfehlen.',
      name: 'Julia Fischer',
      context: 'Haushaltsauflösung, Freising',
    },
  ];

  constructor() {
    const titleService = inject(Title);
    const meta = inject(Meta);
    const document = inject(DOCUMENT);

    titleService.setTitle('Entrümpelung & Haushaltsauflösung | Räumkraft Pfaffenhofen');
    meta.updateTag({
      name: 'description',
      content:
        'Räumkraft – Ihr Experte für Entrümpelung, Haushaltsauflösung und Sperrmüllentsorgung im Landkreis Pfaffenhofen und Umgebung. Festpreisangebot, schnell & zuverlässig.',
    });

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: UNTERNEHMEN.name,
      telephone: UNTERNEHMEN.telefon,
      email: UNTERNEHMEN.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: UNTERNEHMEN.strasse,
        addressLocality: 'Ilmmünster',
        postalCode: '85304',
        addressCountry: 'DE',
      },
      areaServed: 'Landkreis Pfaffenhofen und Umgebung',
      url: 'https://raum-kraft.de',
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    afterNextRender(() => this.galerieAktualisieren());
  }

  protected galerieAktualisieren(): void {
    const track = this.galerieTrack().nativeElement;
    const folien = track.children;
    if (folien.length < 2) return;

    const schritt = (folien[1] as HTMLElement).offsetLeft - (folien[0] as HTMLElement).offsetLeft;
    const sichtbar = Math.max(1, Math.round(track.clientWidth / schritt));
    const anzahl = Math.max(1, folien.length - sichtbar + 1);
    const amEnde = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;

    this.seitenAnzahl.set(anzahl);
    this.aktiveSeite.set(
      amEnde ? anzahl - 1 : Math.min(anzahl - 1, Math.round(track.scrollLeft / schritt)),
    );
  }

  protected zuSeite(index: number): void {
    const track = this.galerieTrack().nativeElement;
    const folie = track.children[index] as HTMLElement | undefined;
    if (!folie) return;

    track.scrollTo({
      left: folie.offsetLeft - (track.children[0] as HTMLElement).offsetLeft,
      behavior: 'smooth',
    });
  }
}
