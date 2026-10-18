import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BildPlatzhalter } from '../../../../shared/bild-platzhalter/bild-platzhalter';
import { Icon, IconName } from '../../../../shared/icon/icon';

interface Beispiel {
  icon: IconName;
  text: string;
}

@Component({
  selector: 'app-kleinauftraege-sektion',
  imports: [BildPlatzhalter, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './kleinauftraege-sektion.html',
  styleUrl: './kleinauftraege-sektion.scss',
})
export class KleinauftraegeSektion {
  protected readonly whatsappUrl = 'https://wa.me/4917673225728';

  protected readonly beispiele: Beispiel[] = [
    { icon: 'kellerabteil', text: 'Ein Kellerabteil im Mehrfamilienhaus' },
    { icon: 'dachboden', text: 'Alte Möbel aus dem Dachboden – inklusive Abbau' },
    { icon: 'wallbox', text: 'Garage frei für E-Auto und Wallbox' },
  ];
}
