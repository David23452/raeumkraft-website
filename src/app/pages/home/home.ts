import { DOCUMENT } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { UNTERNEHMEN } from '../../core/data/unternehmen';

interface Testimonial {
  quote: string;
  name: string;
  context: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
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
  }
}
