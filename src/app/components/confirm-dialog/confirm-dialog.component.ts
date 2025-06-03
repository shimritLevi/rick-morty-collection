import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [CommonModule, TranslateModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent {

  /** The character to be deleted */
  @Input() characterName = '';

   /** Used to notify the parent of an confirm event */
  @Output() confirm = new EventEmitter<void>();

   /** Used to notify the parent of an cancel event */
  @Output() cancel = new EventEmitter<void>();

  /** The user confirmed the deletion. */
  onConfirm() {
    this.confirm.emit();
  }

  /** The user canceled the deletion. */
  onCancel() {
    this.cancel.emit();
  }
}
