import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ueber-uns',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Über uns</h1>
    <p>Platzhalter für die Über-uns-Seite.</p>
  `,
})
export class UeberUns {}
