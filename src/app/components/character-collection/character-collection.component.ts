import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterService } from 'src/app/services/character.service';
import { ICharacter } from 'src/app/models/character.model';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { StoreService } from 'src/app/services/store.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AddEditCharacterComponent } from '../add-edit-character/add-edit-character.component';

@Component({
  selector: 'app-character-collection',
  imports: [CommonModule, CharacterCardComponent, AddEditCharacterComponent, TranslateModule, ReactiveFormsModule],
  templateUrl: './character-collection.component.html',
  styleUrl: './character-collection.component.scss',
})
export class CharacterCollectionComponent implements OnInit {

  characters: ICharacter[] = [];

  filteredCharacters: ICharacter[] = [];

  selectedCharacter?: ICharacter;

  showDialog = false;

  /**  save the total number of pages */
  totalPages: number = 0;

  currentPage$ = new BehaviorSubject<number>(1);

  isLoading = false;

  searchForm = new FormControl('');

  constructor(
    private characterService: CharacterService,
    private store: StoreService,
  ) { }

  ngOnInit(): void {
    // Loading characters by page
    this.currentPage$
      .pipe(
        tap(() => (this.isLoading = true)),
        switchMap((page) => this.characterService.getCharactersByPage(page)),
      )
      .subscribe((res) => {
        this.isLoading = false;
        this.totalPages = res.info.pages;

        // Integrating new characters with existing ones
        this.characters.push(...res.results);
        this.store.add(this.characters);
      });

    // Live search based on store + searchForm
    combineLatest([
      this.store.getAllCharacters(),
      this.searchForm.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        startWith('')
      )
    ])
      .pipe(
        map(([characters, searchTerm]) => {
          const term = searchTerm?.toLowerCase().trim();
          if (!term) return characters;

          return characters.filter((character) =>
            character.name.toLowerCase().includes(term) ||
            character.species.toLowerCase().includes(term) // TODO location
          );
        })
      )
      .subscribe((filtered) => {
        this.filteredCharacters = filtered;
      });
  }

  /**
   * Open edit dialog.
   * @param character The character to edit
   */
  openEditDialog(character: ICharacter) {
    this.selectedCharacter = character;
    this.showDialog = true;
  }

  /**
   * Close edit dialog.
   */
  closeDialog() {
    this.showDialog = false;
    this.selectedCharacter = undefined;
  }

  /**
   * Update character using StoreService.
   * @param updated The character to update
   */
  updateCharacter(updated: ICharacter) {
    this.store.update(updated)
    this.closeDialog();
  }

  /**
   * Delete character using StoreService.
   * @param toDelete  The character to delete
   */
  deleteCharacter(toDelete: ICharacter) {
    this.store.delete(toDelete);
  }


  @HostListener('window:scroll', [])
  onScroll(): void {
    const bottomReached =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

    if (bottomReached && !this.isLoading && this.currentPage$.value < this.totalPages) {
      this.loadMore();
    }
  }

  /**
   * Load more characters when the user scrolls to the bottom of the page.
   */
  loadMore(): void {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

}
