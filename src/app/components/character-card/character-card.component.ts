import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICharacter } from 'src/app/models/character.model';
import { FavoriteService } from 'src/app/services/favorite.service';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-character-card',
  imports: [CommonModule, TranslateModule, ConfirmDialogComponent],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent {

  /** Is it in favorites view or collaction view */
  @Input() isFavoriteView: boolean = false;

  /** The character */
  @Input() character!: ICharacter;

  /** Used to notify the parent of an update event */
  @Output() edit = new EventEmitter<void>();

  /** Used to notify the parent of an delete event */
  @Output() delete = new EventEmitter<void>();

  /** Used for the delete confirmation dialog - whether the character has been selected for deletion*/
  selectedCharacterForDelete: ICharacter | null = null;

  constructor(private favoriteService: FavoriteService) { }

  /**
   * Clicking the Favorite button will toggle the character as favorite.
   * @param event MouseEvent used to prevents unwanted opening of the editor
   * @param character  The character to toggle as favorite
   */
  toggleFavorite(event: MouseEvent, character: ICharacter): void {
    event.stopPropagation();
    if (this.isFavorite(character)) {
      this.favoriteService.deleteFavorite(character);
    } else {
      this.favoriteService.addToFavorite(character);
    }
  }

  /**
   * Is the character marked as a favorite.
   * @param character The character to check if favorite
   * @returns 
   */
  isFavorite(character: ICharacter): boolean {
    return this.favoriteService.isFavorite(character);
  }

  /**
   * Notify the parent component of an edit event.
   */
  onEditClick() {
    this.edit.emit();
  }

  /**
   * Clicking the Delete button will pop up a dialog to confirm the action.
   * @param event MouseEvent used to prevents unwanted opening of the editor
   * @param character The character to be deleted
   */
  confirmDelete(event: MouseEvent, character: ICharacter) {
    event.stopPropagation();
    this.selectedCharacterForDelete = character;
  }

  /**
   * Canceling the request to delete the character.
   */
  cancelDelete() {
    this.selectedCharacterForDelete = null;
  }

  /**
   * Deleting the character.
   */
  onDeleteConfirmed() {
    this.delete.emit();
  }

}
