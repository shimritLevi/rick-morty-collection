import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../models/api-calls.model';
import { ICharacter } from '../models/character.model';

/** Managing character API calls */
@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  /** The endpoint URL */
  private baseUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  /**
   * Get character by ID from the API.
   * @param id character ID
   * @returns the characters
   */
  getCharacterByID(id: number): Observable<ICharacter> {
    return this.http.get<ICharacter>(`${this.baseUrl}/${id}`);
  }

  /**
   * Get character by page number from the API.
   * @param page the current page
   * @returns the characters
   */
  getCharactersByPage(page = 1): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(`${this.baseUrl}?page=${page}`);
  }

}
