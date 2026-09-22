import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { EINSATZGEBIETE } from '../../../core/data/einsatzgebiete';

@Component({
  selector: 'app-einsatzgebiet-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>{{ einsatzgebiet()?.name ?? 'Einsatzgebiet' }}</h1>
    <p>Platzhalter für die Detailseite des Einsatzgebiets "{{ slug() }}".</p>
  `,
})
export class EinsatzgebietDetail {
  private readonly route = inject(ActivatedRoute);

  protected readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('landkreis') ?? '')),
    { initialValue: '' },
  );

  protected readonly einsatzgebiet = computed(() =>
    EINSATZGEBIETE.find((gebiet) => gebiet.slug === this.slug()),
  );
}
