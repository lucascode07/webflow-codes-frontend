import { Component, inject, signal } from '@angular/core';
import { CodeService } from '../../services/code.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  EMAIL_PATTERN,
  ONLY_NUMBERS_PATTERN,
} from '../../utils/constants/patterns.constants';

@Component({
  selector: 'register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  host: { class: 'forms__content' },
})
export class RegisterFormComponent {
  private readonly _codeService = inject(CodeService);
  private readonly _fb = inject(FormBuilder);

  public showLoader = signal<boolean>(false);

  public registerForm = this._fb.group({
    fullName: ['', [Validators.required]],
    phone: [
      '',
      [Validators.required, Validators.pattern(ONLY_NUMBERS_PATTERN)],
    ],
    email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
  });

  public sendRegisterForm(): void {
    this.showLoader.set(true);

    if (this.registerForm.invalid) return;

    console.log({
      ...this.registerForm.value,
      code: this._codeService.codeValue?.code,
    });
  }
}
