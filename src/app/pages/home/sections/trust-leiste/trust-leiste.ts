import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Icon, IconName } from '../../../../shared/icon/icon';

interface TrustPunkt {
  icon: IconName;
  titel: string;
  text: string;
}

@Component({
  selector: 'app-trust-leiste',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './trust-leiste.html',
  styleUrl: './trust-leiste.scss',
})
export class TrustLeiste {
  protected readonly punkte: TrustPunkt[] = [
    {
      icon: 'festpreis',
      titel: 'Schriftlicher Festpreis',
      text: 'Was wir anbieten, zahlen Sie. Keine Nachberechnung.',
    },
    {
      icon: 'klein',
      titel: 'Auch kleine Aufträge',
      text: 'Schon ab einem Kellerabteil – kein Mindestumsatz.',
    },
    {
      icon: 'diskret',
      titel: 'Diskret & respektvoll',
      // TODO PRÜFEN: Steht ein unbeschriftetes Fahrzeug wirklich zur Verfügung?
      text: 'Unbeschriftetes Fahrzeug auf Wunsch, kein Gerede in der Nachbarschaft.',
    },
    {
      icon: 'standort',
      titel: 'Aus Ilmmünster',
      text: 'Inhabergeführt, kurze Wege im ganzen Landkreis.',
    },
  ];

  // TODO: Aktuell zur Vorschau sichtbar. Vor dem Livegang auf false setzen,
  // bis 5 echte Bewertungen vorliegen – dann Wert/Anzahl unten eintragen.
  protected readonly zeigeGoogleBewertung = true;
  protected readonly googleBewertung = { wert: '5,0', anzahl: 5 };
}
