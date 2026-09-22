import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { LEISTUNGEN } from '../../../core/data/leistungen';

@Component({
  selector: 'app-leistung-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>{{ leistung()?.name ?? 'Leistung' }}</h1>
    <p>Platzhalter für die Detailseite der Leistung "{{ slug() }}".</p>
  `,
})
export class LeistungDetail {
  private readonly route = inject(ActivatedRoute);

  protected readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: '' },
  );

  protected readonly leistung = computed(() =>
    LEISTUNGEN.find((leistung) => leistung.slug === this.slug()),
  );
}
