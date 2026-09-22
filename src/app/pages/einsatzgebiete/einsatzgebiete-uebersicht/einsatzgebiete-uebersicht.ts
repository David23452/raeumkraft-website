import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EINSATZGEBIETE } from '../../../core/data/einsatzgebiete';

@Component({
  selector: 'app-einsatzgebiete-uebersicht',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Einsatzgebiete</h1>
    <p>Platzhalter für die Einsatzgebiete-Übersicht.</p>
    <ul>
      @for (gebiet of einsatzgebiete; track gebiet.slug) {
        <li><a [routerLink]="['/einsatzgebiete', gebiet.slug]">{{ gebiet.name }}</a></li>
      }
    </ul>
  `,
})
export class EinsatzgebieteUebersicht {
  protected readonly einsatzgebiete = EINSATZGEBIETE;
}
