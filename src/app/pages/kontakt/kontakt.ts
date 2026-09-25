import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-contact-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ContactFormComponent],
  templateUrl: './contact-page.component.html'
})
export class Kontakt {}
