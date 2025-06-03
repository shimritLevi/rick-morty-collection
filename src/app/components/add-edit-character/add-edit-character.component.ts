import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICharacter } from 'src/app/models/character.model';
import { TranslateModule } from '@ngx-translate/core';
import { StoreService } from 'src/app/services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-character',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './add-edit-character.component.html',
  styleUrl: './add-edit-character.component.scss',
})
export class AddEditCharacterComponent implements OnInit {

  @Input() character?: ICharacter;

  @Input() isInEditMode: boolean = false;

  @Output() edit = new EventEmitter<ICharacter>();

  characterForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: StoreService,
    private router: Router) { }

  ngOnInit(): void {
    this.characterForm = this.formBuilder.group({
      id: [this.character?.id || null],
      name: [this.character?.name || '', Validators.required],
      status: [this.character?.status || '', Validators.required],
      species: [this.character?.species || ''],
      image: [this.character?.image || '', [Validators.required, Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/)]]
    });
  }

  /**
   * When the user submits the form - check if the form ​valide and update 
   * parent component accordingly.
   */
  onSubmit(): void {
    if (this.characterForm.valid) {
      const character: ICharacter = {
        ...this.characterForm.value,
        id: this.characterForm.value.id ?? Math.floor(Math.random() * 100000), // fake ID
      };
      if (this.isInEditMode) {
        this.edit.emit(character);
      } else {
        this.store.add([character]);
        this.router.navigate(['/']);
      }
    } else {
      this.characterForm.markAllAsTouched();
    }
  }

}
