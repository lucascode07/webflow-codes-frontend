import { Component, signal } from '@angular/core';
import { ConfirmStatusComponent } from '../confirm-status/confirm-status.component';
import { CONFIRMED_IMAGE_SOURCE, RECONFIRMED_IMAGE_SOURCE } from '../../utils/constants/img-src-confirm.constants';

@Component({
  selector: 'confirm-message',
  standalone: true,
  imports: [ConfirmStatusComponent],
  templateUrl: './confirm-message.component.html',
  styleUrl: './confirm-message.component.scss',
  host: { class: 'forms__content' },
})
export class ConfirmMessageComponent {
  public imageSource = signal<string>(CONFIRMED_IMAGE_SOURCE);
}
