import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { LOCATIONS } from '../../core/data/locations';
import { UNTERNEHMEN } from '../../core/data/unternehmen';

@Component({
  selector: 'app-einsatzgebiete',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="einsatzgebiete">
      <h1>Einsatzgebiete</h1>
      <p class="einsatzgebiete__intro">
        Räumkraft ist im Landkreis Pfaffenhofen und den umliegenden Regionen für Sie im Einsatz.
        Auf Anfrage kommen wir auch bis zu 150 km von unserem Standort in {{ unternehmen.plzOrt }} zu Ihnen.
      </p>

      <ul class="einsatzgebiete__list">
        @for (location of locations; track location.slug) {
          <li>
            <a [routerLink]="['/einsatzgebiete', location.slug]">
              {{ location.name }}
            </a>
          </li>
        }
      </ul>
    </main>
  `,
})
export class Einsatzgebiete {
  protected readonly locations = LOCATIONS;
  protected readonly unternehmen = UNTERNEHMEN;

  constructor() {
    const titleService = inject(Title);
    const meta = inject(Meta);

    titleService.setTitle('Einsatzgebiete | Räumkraft');
    meta.updateTag({
      name: 'description',
      content:
        'Räumkraft ist im Landkreis Pfaffenhofen und Umgebung tätig – Freising, Ingolstadt, Dachau und mehr. Auf Anfrage bis 150 km.',
    });
  }
}
