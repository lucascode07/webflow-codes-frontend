import { Component, input } from '@angular/core';

@Component({
  selector: 'confirm-status',
  standalone: true,
  imports: [],
  templateUrl: './confirm-status.component.html',
  styleUrl: './confirm-status.component.scss',
})
export class ConfirmStatusComponent {
  public imageSource = input.required<string>();
}
