import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BildPlatzhalter } from '../../../../shared/bild-platzhalter/bild-platzhalter';

interface Situation {
  zitat: string;
  text: string;
}

@Component({
  selector: 'app-problem-sektion',
  imports: [BildPlatzhalter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './problem-sektion.html',
  styleUrl: './problem-sektion.scss',
})
export class ProblemSektion {
  protected readonly situationen: Situation[] = [
    {
      zitat: '„Die Wohnung meiner Mutter musste leergeräumt werden – und das möglichst schnell.“',
      text: 'Nach einem Todesfall läuft die Kündigungsfrist, während Sie eigentlich Zeit zum Abschiednehmen bräuchten. Wir nehmen Ihnen die Arbeit ab, damit Sie sich um das Wichtige kümmern können.',
    },
    {
      zitat: '„Über viele Jahre hat sich dort ein komplettes Leben angesammelt.“',
      text: 'Wenn Mutter oder Vater ins Pflegeheim zieht, laufen Miete und Heimkosten parallel. Wir räumen zügig und sichern vorher, was Ihnen wichtig ist.',
    },
    {
      zitat: '„Meine Garage war irgendwann mehr Abstellraum als Garage.“',
      text: 'Der Heizungsbauer kommt, die Wallbox soll rein, der Umbau startet – und vorher muss alles raus. Wir halten Ihren Termin.',
    },
    {
      zitat: '„Zwei schwere Schränke hätte ich alleine nie bewegen können.“',
      text: 'Wenn der Rücken nicht mehr mitmacht, wird der Keller zur Stolperfalle. Wir tragen – Sie entscheiden, was bleibt.',
    },
    {
      zitat: '„Sie möchte nichts wegwerfen, weil alles Geld gekostet hat.“',
      text: 'Sie wollen den Eltern helfen, aber jedes Stück wird zur Diskussion. Wir arbeiten geduldig und respektvoll – und gehen erst, wenn alle einverstanden sind.',
    },
    {
      zitat: '„Das Haus ist jetzt leer!!!“',
      text: 'Sie wollen verkaufen oder neu vermieten, aber das Objekt ist noch voll. Wir übergeben besenrein – bereit für Fotos, Exposé und Besichtigung.',
    },
  ];
}
