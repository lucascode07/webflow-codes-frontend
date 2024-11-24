import { Component, inject, output, signal } from '@angular/core';
import { CodeService } from '../../services/code.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  EMAIL_PATTERN,
  ONLY_NUMBERS_PATTERN,
} from '../../utils/constants/patterns.constants';
import { AttendeeRequest } from '../../models/attende.model';
import { CodeStatus } from '../../models/code.model';
import { Step } from '../../utils/enum/step.interface';

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

  public successRegister = output<Step>();

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

    const body: AttendeeRequest = {
      data: {
        fullName: this.registerForm.value.fullName!,
        phone: this.registerForm.value.phone!,
        email: this.registerForm.value.email!,
        codeStatus: CodeStatus.CONFIRMED,
      },
    };

    this._codeService.registerAttendee(body).subscribe({
      next: () => {
        this.showLoader.set(false);
        this.successRegister.emit(Step.CONFIRM_MESSAGE);
      },
    });
  }
}
