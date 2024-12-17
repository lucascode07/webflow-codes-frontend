import { Component, signal } from '@angular/core';
import { CodeVerificationComponent } from './components/code-verification/code-verification.component';
import { Step } from './utils/enum/step.interface';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ConfirmMessageComponent } from './components/confirm-message/confirm-message.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CodeVerificationComponent,
    RegisterFormComponent,
    ConfirmMessageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public currentStep = signal<Step>(Step.CODE_VERIFICATION);
  public stepValue: typeof Step = Step;

  public nextStep(step: Step): void {
    this.currentStep.set(step);
  }
}
