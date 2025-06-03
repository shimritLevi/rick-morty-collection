import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICharacter } from 'src/app/models/character.model';
import { FavoriteService } from 'src/app/services/favorite.service';
import { CharacterCardComponent } from '../character-card/character-card.component';

@Component({
  selector: 'app-favorites-characters',
  imports: [CommonModule, CharacterCardComponent],
  templateUrl: './favorites-characters.component.html',
  styleUrl: './favorites-characters.component.scss',
})
export class FavoritesCharactersComponent {

  /** All favorite characters */
  favorites: ICharacter[] = [];

  constructor(private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.favorites = this.favoriteService.getAllFavorites();
  }
}
