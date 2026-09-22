import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-impressum',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Impressum</h1>
    <p>Platzhalter für das Impressum.</p>
  `,
})
export class Impressum {}
