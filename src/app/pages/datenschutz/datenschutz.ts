import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-datenschutz',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Datenschutz</h1>
    <p>Platzhalter für die Datenschutzerklärung.</p>
  `,
})
export class Datenschutz {}
