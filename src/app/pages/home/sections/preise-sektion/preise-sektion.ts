import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PREISORIENTIERUNG } from '../../../../core/data/preise';
import { BildPlatzhalter } from '../../../../shared/bild-platzhalter/bild-platzhalter';

@Component({
  selector: 'app-preise-sektion',
  imports: [RouterLink, BildPlatzhalter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './preise-sektion.html',
  styleUrl: './preise-sektion.scss',
})
export class PreiseSektion {
  protected readonly preise = PREISORIENTIERUNG;

  // TODO: Aktuell zur Vorschau sichtbar. Vor dem Livegang prüfen, ob die
  // Wertanrechnung fest angeboten wird – sonst auf false setzen.
  protected readonly zeigeWertanrechnung = true;
}
