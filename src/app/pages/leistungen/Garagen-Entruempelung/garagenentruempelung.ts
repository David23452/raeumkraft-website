import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface AblaufSchritt {
  nummer: string;
  titel: string;
  beschreibung: string;
}

interface Vorteil {
  titel: string;
  beschreibung: string;
}

interface Faq {
  frage: string;
  antwort: string;
}

@Component({
  selector: 'app-garagenentruempelung',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './garagenentruempelung.html',
  styleUrl: './garagenentruempelung.scss',
})
export class Garagenentruempelung {
  protected readonly ablauf: AblaufSchritt[] = [
    {
      nummer: '01',
      titel: 'Fotos schicken',
      beschreibung:
        'Ein paar Handyfotos Ihrer Garage per WhatsApp oder E-Mail reichen für ein erstes Angebot.',
    },
    {
      nummer: '02',
      titel: 'Festpreis erhalten',
      beschreibung:
        'Sie bekommen zeitnah einen verbindlichen Festpreis – ganz ohne versteckte Kosten.',
    },
    {
      nummer: '03',
      titel: 'Termin vereinbaren',
      beschreibung:
        'Wir finden gemeinsam einen Termin, der zu Ihnen passt – auf Wunsch auch kurzfristig.',
    },
    {
      nummer: '04',
      titel: 'Garage übergeben',
      beschreibung:
        'Wir räumen, transportieren und entsorgen fachgerecht. Sie übernehmen Ihre Garage besenrein zurück.',
    },
  ];

  protected readonly gegenstaende: string[] = [
    'Alte Reifen & Felgen',
    'Werkzeug & Maschinen',
    'Fahrräder & Sperrmüll',
    'Farben, Lacke & Chemikalien',
    'Gartengeräte',
    'Regale & Schränke',
    'Kartons & Verpackungsmaterial',
    'Sperrmüll aller Art',
  ];

  protected readonly vorteile: Vorteil[] = [
    {
      titel: 'Festpreis-Garantie',
      beschreibung: 'Kein Stundenlohn, keine versteckten Kosten – der Preis steht schon vorher fest.',
    },
    {
      titel: 'Besenreine Übergabe',
      beschreibung: 'Ihre Garage wird sauber besenrein übergeben – bereit für die nächste Nutzung.',
    },
    {
      titel: 'Schnelle Termine',
      beschreibung:
        'Flexible Terminvergabe im gesamten Landkreis Pfaffenhofen und Umgebung – auch kurzfristig.',
    },
  ];

  protected readonly faqs: Faq[] = [
    {
      frage: 'Was kostet eine Garagenentrümpelung?',
      antwort:
        'Der Preis hängt von Menge und Art der Gegenstände ab. Schicken Sie uns ein paar Fotos für einen kostenlosen, unverbindlichen Festpreis.',
    },
    {
      frage: 'Muss ich bei der Entrümpelung dabei sein?',
      antwort:
        'Nein. Nach Absprache ist die Entrümpelung auch ohne Ihre Anwesenheit möglich, zum Beispiel per Schlüsselübergabe.',
    },
    {
      frage: 'Was passiert mit noch brauchbaren Gegenständen?',
      antwort:
        'Wir prüfen, was gespendet oder weiterverwendet werden kann, und entsorgen den Rest fachgerecht und umweltbewusst.',
    },
  ];
}
