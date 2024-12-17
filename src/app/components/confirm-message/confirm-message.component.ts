import { Component, computed, inject, signal } from '@angular/core';
import { ConfirmStatusComponent } from '../confirm-status/confirm-status.component';
import { RECONFIRMED_IMAGE_SOURCE } from '../../utils/constants/img-src-confirm.constants';
import { CodeService } from '../../services/code.service';

@Component({
  selector: 'confirm-message',
  standalone: true,
  imports: [ConfirmStatusComponent],
  templateUrl: './confirm-message.component.html',
  styleUrl: './confirm-message.component.scss',
  host: { class: 'forms__content' },
})
export class ConfirmMessageComponent {
  private readonly _codeService = inject(CodeService);

  public imageSource = signal<string>(RECONFIRMED_IMAGE_SOURCE);
  public fullName = signal<string>(this._codeService.fullNameValue!);

  public firstName = computed(() => this.fullName().split(' ')[0]);
}
