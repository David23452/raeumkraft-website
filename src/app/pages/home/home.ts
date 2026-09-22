import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Startseite</h1>
    <p>Platzhalter für die Startseite von Raumkraft.</p>
  `,
})
export class Home {}
