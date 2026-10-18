import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type BildFormat = '16/9' | '4/3' | '1/1';
export type BildTon = 'muted' | 'mint' | 'peach' | 'periwinkle' | 'lime';

/**
 * Platzhalter für noch fehlende Fotos: getönte Fläche mit festem
 * Seitenverhältnis und sichtbarer Beschriftung. Sobald das echte Bild
 * vorliegt, durch ein <img ngSrc> mit demselben alt-Text ersetzen.
 */
@Component({
  selector: 'app-bild-platzhalter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'img',
    '[attr.aria-label]': 'alt()',
    '[style.aspect-ratio]': 'format()',
    '[style.background]': "'var(--color-placeholder-' + ton() + ')'",
  },
  template: `<span class="label" aria-hidden="true">Bild: {{ beschriftung() }}</span>`,
  styles: `
    :host {
      --color-placeholder-muted: var(--color-surface-muted);

      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      border-radius: var(--radius-lg);
      overflow: hidden;
    }

    .label {
      padding: var(--space-4);
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text-primary);
      text-align: center;
    }
  `,
})
export class BildPlatzhalter {
  readonly beschriftung = input.required<string>();
  readonly alt = input.required<string>();
  readonly format = input<BildFormat>('4/3');
  readonly ton = input<BildTon>('muted');
}
