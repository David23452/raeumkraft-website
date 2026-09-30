import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Leistung, LEISTUNGEN } from '../../../core/data/leistungen';

@Component({
  selector: 'app-leistungen-uebersicht',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Leistungen</h1>
    <p>Platzhalter für die Leistungen-Übersicht.</p>
    <ul>
      @for (leistung of leistungen; track leistung.slug) {
        <li><a [routerLink]="['/leistungen', leistung.slug]">{{ leistung.name }}</a></li>
      }
    </ul>
  `,
})
export class LeistungenUebersicht {
  protected readonly leistungen = LEISTUNGEN;

}

export function findLeistung(slug: string | null): Leistung | undefined {
  return LEISTUNGEN.find((l) => l.slug === slug);
}
