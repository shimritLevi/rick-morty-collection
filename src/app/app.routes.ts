import { Route } from '@angular/router';
import { CharacterCollectionComponent } from './components/character-collection/character-collection.component';
import { RoutingPath } from './models/routing-path.model';
import { FavoritesCharactersComponent } from './components/favorites-characters/favorites-characters.component';
import { AddEditCharacterComponent } from './components/add-edit-character/add-edit-character.component';
import { CharacterMapComponent } from './components/character-map/character-map.component';
import { AbouteComponent } from './components/aboute/aboute.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: CharacterCollectionComponent
    },
    {
        path: RoutingPath.FAVORITES,
        component: FavoritesCharactersComponent
    },
    {
        path: RoutingPath.ADD_EDIT,
        component: AddEditCharacterComponent
    },
    {
        path: RoutingPath.MAP,
        component: CharacterMapComponent
    },
    {
        path: RoutingPath.ABOUTE,
        component: AbouteComponent
    }
];
