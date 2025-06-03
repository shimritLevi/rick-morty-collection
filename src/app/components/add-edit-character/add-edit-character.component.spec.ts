import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditCharacterComponent } from './add-edit-character.component';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ICharacter } from 'src/app/models/character.model';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

describe('AddEditCharacterComponent', () => {
  let component: AddEditCharacterComponent;
  let fixture: ComponentFixture<AddEditCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {}, queryParams: {} },
            params: of({}),
            queryParams: of({}),
          },
        }, provideHttpClientTesting(),],
      imports: [AddEditCharacterComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should initialize form with initial data', () => {
    const mockChar: ICharacter = {
      id: 1,
      name: 'Rick',
      status: 'Alive',
      species: 'Human',
      image: 'img.jpg',
      location: { name: 'Earth' },
    };
    component.character = mockChar;
    component.ngOnInit();

    expect(component.characterForm.value.name).toBe('Rick');
    expect(component.characterForm.value.status).toBe('Alive');
  });
});
