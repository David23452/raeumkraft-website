import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Linien-Icons im Stil des vorhandenen Testimonial-Avatars
 * (24er-Raster, Stroke 1.5, currentColor). Rein dekorativ → aria-hidden.
 */
const ICON_PATHS = {
  festpreis: [
    'M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z',
    'M14 3v4h4',
    'M9 14l2 2 4-4',
  ],
  klein: ['M3.5 8 12 4l8.5 4v8L12 20l-8.5-4z', 'M3.5 8 12 12l8.5-4', 'M12 12v8'],
  diskret: [
    'M3 3l18 18',
    'M10.6 6.1A9.8 9.8 0 0 1 12 6c5 0 8.5 4.5 9 6-.3.9-1.2 2.4-2.6 3.7',
    'M6.6 7.6C4.6 8.9 3.4 10.8 3 12c.5 1.5 4 6 9 6 1.6 0 3-.4 4.3-1.1',
    'M9.9 9.9a3 3 0 0 0 4.2 4.2',
  ],
  standort: [
    'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z',
    'M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  ],
  haken: ['M5 12.5l4.5 4.5L19 7.5'],
  kellerabteil: ['M5 21V4h14v17', 'M3 21h18', 'M9 8h6', 'M9 12h6', 'M9 16h6'],
  dachboden: ['M3 11l9-7 9 7', 'M5 9.5V20h14V9.5', 'M10 20v-5h4v5'],
  wallbox: ['M13 3 5 13h6l-1 8 8-10h-6z'],
  stern: ['M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z'],
} as const;

export type IconName = keyof typeof ICON_PATHS;

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      focusable="false"
    >
      @for (d of paths(); track $index) {
        <svg:path [attr.d]="d" />
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();

  protected readonly paths = computed(() => ICON_PATHS[this.name()]);
}
