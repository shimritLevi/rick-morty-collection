import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationCoordsService } from 'src/app/services/location-coords.service';
import { StoreService } from 'src/app/services/store.service';
import { ICharacter } from 'src/app/models/character.model';
import { GoogleMapsModule, MapInfoWindow } from '@angular/google-maps';
import { ViewChild } from '@angular/core';

interface IMarker { lat: number; lng: number; label: string }

@Component({
  selector: 'app-character-map',
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './character-map.component.html',
  styleUrl: './character-map.component.scss',
})
export class CharacterMapComponent {

  /** Characters list */
  characters: ICharacter[] = [];

  /** List of all map markers */
  markers: IMarker[] = [];

  /** Starting point */
  center = { lat: 0, lng: 0 };

  /** Starting zoom */
  zoom = 5;

  /** The current selected character */
  selectedCharacter: ICharacter | null = null;

  /** Clicking on a marker on the map will open a tab with the character's details. */
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  constructor(
    private store: StoreService,
    private coordService: LocationCoordsService
  ) { }

  ngOnInit(): void {
    this.store.getAllCharacters().subscribe((chars) => {
      this.characters = chars;

      this.markers = chars.map((char) => {
        const coords = this.coordService.getCoords(char.location.name);
        return {
          lat: coords.lat,
          lng: coords.lng,
          label: char.name,
        };
      });

      // centers the map on the first character
      if (this.markers.length > 0) {
        this.center = {
          lat: this.markers[0].lat,
          lng: this.markers[0].lng
        };
      }
    });
  }

  /**
   * Get the coordinates for the character to display on the map using LocationCoordsService.
   * @param locationName character.location.name
   * @returns {lat: number; lng: number;}
   */
  getCoordsForCharacter(locationName: string): { lat: number; lng: number } {
    return this.coordService.getCoords(locationName)
  }

  /**
   * On character clicked event (on the map) - display character data in a popup.
   * @param character The selected character from the map
   * @param marker marker object
   */
  openInfo(character: ICharacter, marker: any) {
    this.selectedCharacter = character;
    this.infoWindow.open(marker);
  }
}
