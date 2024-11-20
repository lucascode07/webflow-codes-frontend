import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _fb = inject(FormBuilder);

  public showLoader = signal<boolean>(false);

  public codeForm = this._fb.group({
    code: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
    ],
  });

  public onSubmit() {
    this.showLoader.set(true);

    if (this.codeForm.invalid) return;
  }
}
