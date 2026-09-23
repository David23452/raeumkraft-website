import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Testimonial {
  quote: string;
  name: string;
  context: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  // Platzhalter-Texte für die Kundenstimmen – später durch echte Bewertungen ersetzen
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
}