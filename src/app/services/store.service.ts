import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICharacter } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private characters$ = new BehaviorSubject<ICharacter[]>([]);

  constructor() { }

  /** 
   * Get all characters in storage - those loaded, those added manually 
   * (excluding those deleted) 
   */
  getAllCharacters() {
    return this.characters$.asObservable();
  }

  /**
   * @returns Characters list.
   */
  get(): ICharacter[] {
    return this.characters$.value;
  }

  /**
   * Set characters.
   * @param characters 
   */
  set(characters: ICharacter[]) {
    this.characters$.next(characters);
  }

  /**
   * Add new character
   * @param newCharacter The character to add
   */
  add(newCharacter: ICharacter[]) {
    const charactersNew = [...this.characters$.value, ...newCharacter];
    this.characters$.next(charactersNew);
  }

  /**
   * Update character values
   * @param updated updated values
   */
  update(updated: ICharacter) {
    const charactersNew = this.characters$.value;
    const index = charactersNew.findIndex(c => c.id === updated.id);
    if (index !== -1) {
      charactersNew[index] = this.mergeCharacter(updated, charactersNew[index]);
      this.characters$.next(charactersNew);
    }
  }

  /**
   * Merging two characters objects so that the values ​​from the first character (updated) object
   * will overwrite the values ​​existing in the second (original) object, but anything missing will 
   * be preserved from the original.
   * @param updated The character with the updated values
   * @param original The character with the original values
   * @returns Merging them while maintaining existing values
   */
  mergeCharacter(updated: any, original: any): any {
    // Creating a deep copy of the original so as not to change it
    const merged = structuredClone(original);

    // Overwrite existing fields only
    for (const key in updated) {
      if (updated[key] !== undefined) {
        merged[key] = updated[key];
      }
    }

    return merged;
  }

  /**
   * Remove character.
   * @param characterToDelete The character to delete
   */
  delete(characterToDelete: ICharacter) {
    const charactersNew = this.characters$.value.filter(c => c.id !== characterToDelete.id);
    this.characters$.next(charactersNew);
  }
}
