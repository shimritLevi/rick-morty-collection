import { Injectable } from '@angular/core';
import { ICharacter } from '../models/character.model';
import { FAVORITES_KEY } from '../models/constants.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor() { }

  /**
   * Add a character to favorites.
   * Use local storage to save the user's favorite characters, so that 
   * they can be easily accessed in future sessions.
   * @param newCharacter 
   * @returns true if succeeded
   */
  addToFavorite(newCharacter: ICharacter): boolean {
    const favorites = this.getAllFavorites();
    if (favorites.some(f => f.id === newCharacter.id)) {
      return false;
    } else {
      favorites.push(newCharacter);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
    return false;
  }

  /**
   * Delete character from favorites.
   * @param characterToDelete 
   */
  deleteFavorite(characterToDelete: ICharacter): void {
    const favorites = this.getAllFavorites().filter(f => f.id !== characterToDelete.id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }

  /**
   * @param character 
   * @returns True if the character marked as favorites
   */
  isFavorite(character: ICharacter): boolean {
    return this.getAllFavorites().some((c) => c.id === character.id);
  }

  /**
   * @returns All favorites characters
   */
  getAllFavorites(): ICharacter[] {
    const charactersFromStore = localStorage.getItem(FAVORITES_KEY);
    return charactersFromStore ? JSON.parse(charactersFromStore) : [];
  }
}
