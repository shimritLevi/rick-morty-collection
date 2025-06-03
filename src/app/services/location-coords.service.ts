import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { COORDS_KEY } from '../models/constants.model';


@Injectable({
  providedIn: 'root'
})
export class LocationCoordsService {

  private cache: Record<string, { lat: number; lng: number }> = {};

  constructor() {
    const stored = localStorage.getItem(COORDS_KEY);
    if (stored) {
      this.cache = JSON.parse(stored);
    }
  }

  /**
   * Because location.name from the Rick and Morty API describes imaginary worlds 
   * Google's geocoding service will not find a result.
   * Therefore, we will generate consistent random coordinates for each location,
   * and store them in localStorage so that we don't have to calculate them again.
   */
  getCoords(locationName: string): { lat: number; lng: number } {
    if (this.cache[locationName]) {
      return this.cache[locationName];
    }

    // Generating random but consistent coordinates from a string
    const hash = this.stringToHash(locationName);
    const lat = ((hash % 18000) / 100) - 90;     // Range between 90 and -90
    const lng = ((hash % 36000) / 100) - 180;    // Range between -180 and -180

    const coords = { lat, lng };
    this.cache[locationName] = coords;
    localStorage.setItem(COORDS_KEY, JSON.stringify(this.cache));

    return coords;
  }

  private stringToHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  }

}
