import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UNTERNEHMEN } from '../../core/data/unternehmen';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly unternehmen = UNTERNEHMEN;
  protected readonly jahr = new Date().getFullYear();
}
