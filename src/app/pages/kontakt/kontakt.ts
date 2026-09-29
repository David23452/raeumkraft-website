import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Kontaktformular } from '../../shared/kontaktformular/kontaktformular';

@Component({
  selector: 'app-kontakt',
  imports: [Kontaktformular],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './kontakt.html',
  styleUrl: './kontakt.scss',
})
export class Kontakt {}
