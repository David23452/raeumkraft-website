import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-kontakt',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Kontakt</h1>
    <p>Platzhalter für die Kontaktseite.</p>
  `,
})
export class Kontakt {}
