import { Component, inject, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CodeService } from '../../services/code.service';
import { Step } from '../../utils/enum/step.interface';

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

  public codeForm = this._fb.group({
    code: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
    ],
  });

  public onSubmit(): void {
    this.showLoader.set(true);
    if (this.codeForm.invalid) return;

    this._codeService.verifyCode(this.codeForm.value.code!).subscribe({
      next: () => {
        this.showLoader.set(false);
        this.successVerification.emit(Step.REGISTER_FORM);
      },
      error: () => {
        this.showLoader.set(false);
      },
    });
  }
}
