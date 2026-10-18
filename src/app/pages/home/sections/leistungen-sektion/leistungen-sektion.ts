import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BildPlatzhalter, BildTon } from '../../../../shared/bild-platzhalter/bild-platzhalter';
import { Icon } from '../../../../shared/icon/icon';

interface LeistungKarte {
  titel: string;
  text: string;
  linkText: string;
  link: string;
  bild: { beschriftung: string; alt: string; ton: BildTon };
}

@Component({
  selector: 'app-leistungen-sektion',
  imports: [BildPlatzhalter, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './leistungen-sektion.html',
  styleUrl: './leistungen-sektion.scss',
})
export class LeistungenSektion {
  protected readonly leistungen: LeistungKarte[] = [
    {
      titel: 'Keller, Garage & Dachboden',
      text: 'Vom einzelnen Kellerabteil bis zum vollgestellten Stadel. Platz für Umbau, Wärmepumpe oder einfach wieder für das Auto.',
      linkText: 'Teilentrümpelung ansehen',
      link: '#', // TODO: Landingpage
      bild: { beschriftung: 'Geräumte Garage', alt: 'Geräumte, leere Garage', ton: 'mint' },
    },
    {
      titel: 'Haushaltsauflösung nach Todesfall',
      text: 'Wir räumen die Wohnung oder das Haus Ihrer Angehörigen behutsam – und legen Dokumente, Fotos und Erinnerungsstücke für Sie beiseite.',
      linkText: 'Haushaltsauflösung ansehen',
      link: '#', // TODO: Landingpage
      bild: {
        beschriftung: 'Möbel werden behutsam getragen',
        alt: 'Möbel werden behutsam aus einer Wohnung getragen',
        ton: 'periwinkle',
      },
    },
    {
      titel: 'Wohnungsauflösung bei Umzug ins Pflegeheim',
      text: 'Damit keine doppelte Miete läuft: zügige Räumung, besenreine Übergabe an den Vermieter.',
      linkText: 'Wohnungsauflösung ansehen',
      link: '#', // TODO: Landingpage
      bild: {
        beschriftung: 'Besenreine, leere Wohnung',
        alt: 'Besenreine, leere Wohnung nach der Räumung',
        ton: 'lime',
      },
    },
  ];

  protected readonly inklusive = [
    'Tragen & Demontage',
    'Abtransport',
    'fachgerechte Entsorgung',
    'besenreine Übergabe',
  ];

  // TODO: Aktuell zur Vorschau sichtbar. Vor dem Livegang prüfen, ob das Angebot
  // feststeht – sonst auf false setzen.
  protected readonly zeigeOptional = true;
  protected readonly optional = [
    'Wertanrechnung verwertbarer Gegenstände',
    'Entsorgungsnachweis',
    'Endreinigung',
  ];
}
