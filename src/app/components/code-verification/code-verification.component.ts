import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CodeService } from '../../services/code.service';
import { Step } from '../../utils/enum/step.interface';
import { CodeStatus } from '../../models/code.model';
import {
  BUTTON_TEXT_ERROR,
  DEFAULT_BUTTON_TEXT,
  DEFAULT_ERROR_MESSAGE,
  ERROR_MESSAGE_CONFIRMED,
} from '../../utils/constants/text-messages.constants';

@Component({
  selector: 'code-verification',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './code-verification.component.html',
  styleUrl: './code-verification.component.scss',
  host: { class: 'forms__content' },
})
export class CodeVerificationComponent {
  private readonly _fb = inject(FormBuilder);
  private readonly _codeService = inject(CodeService);

  public successVerification = output<Step>();

  public showLoader = signal<boolean>(false);
  public codeHasError = signal<boolean>(false);
  public errorMessage = signal<string>(DEFAULT_ERROR_MESSAGE);
  public buttonText = signal<string>(DEFAULT_BUTTON_TEXT);

  public codeForm = this._fb.group({
    code: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
    ],
  });

  constructor() {
    this.codeForm.valueChanges.subscribe(() => {
      this.codeHasError.set(false);
      this.errorMessage.set(DEFAULT_ERROR_MESSAGE);
      this.buttonText.set(DEFAULT_BUTTON_TEXT);
    });
  }

  public onSubmit(): void {
    if (this.codeForm.invalid) return;
    if (this.codeHasError()) return;

    this.showLoader.set(true);

    this._codeService.verifyCode(this.codeForm.value.code!).subscribe({
      next: (status) => {
        this.showLoader.set(false);
        if (status === CodeStatus.NOT_CONFIRMED) {
          this.successVerification.emit(Step.REGISTER_FORM);
        } else if (status === CodeStatus.EXPIRED) {
          this.codeHasError.set(true);
          this.buttonText.set(BUTTON_TEXT_ERROR);
        } else if (status === CodeStatus.CONFIRMED) {
          this.codeHasError.set(true);
          this.errorMessage.set(ERROR_MESSAGE_CONFIRMED);
          this.buttonText.set(BUTTON_TEXT_ERROR);
        }
      },
      error: () => {
        this.showLoader.set(false);
        this.codeHasError.set(true);
        this.buttonText.set(BUTTON_TEXT_ERROR);
      },
    });
  }
}
