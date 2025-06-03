import { FavoriteService } from './favorite.service';
import { ICharacter } from '../models/character.model';


describe('FavoriteService', () => {
  let service: FavoriteService;

  const mockCharacter: ICharacter = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    image: 'https://rick.com/image.jpg',
    location: { name: 'Earth' },
  };

  const mockCharacter2: ICharacter = {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    location: { name: 'Citadel of Ricks' },
  };

  beforeEach(() => {
    localStorage.clear();
    service = new FavoriteService();
  });

  it('should add character to favorites', () => {
    service.addToFavorite(mockCharacter);
    const favorites = service.getAllFavorites();
    expect(favorites.length).toBe(1);
    expect(favorites[0].name).toBe('Rick Sanchez');
  });

  it('should not add duplicate characters', () => {
    service.addToFavorite(mockCharacter);
    service.addToFavorite(mockCharacter);
    const favorites = service.getAllFavorites();
    expect(favorites.length).toBe(1);
  });

  it('should remove character from favorites', () => {
    service.addToFavorite(mockCharacter);
    service.deleteFavorite(mockCharacter);
    const favorites = service.getAllFavorites();
    expect(favorites.length).toBe(0);
  });

  it('should check if character is favorite', () => {
    service.addToFavorite(mockCharacter);
    expect(service.isFavorite(mockCharacter)).toBe(true);
    expect(service.isFavorite(mockCharacter2)).toBe(false);
  });
  
});
