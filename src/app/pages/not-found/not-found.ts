import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Seite nicht gefunden</h1>
    <p>Die angeforderte Seite existiert nicht.</p>
    <a routerLink="/">Zurück zur Startseite</a>
  `,
})
export class NotFound {}
