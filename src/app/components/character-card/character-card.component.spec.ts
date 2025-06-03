import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCardComponent } from './character-card.component';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ICharacter } from 'src/app/models/character.model';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

describe('CharacterCardComponent', () => {
  let component: CharacterCardComponent;
  let fixture: ComponentFixture<CharacterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()],
      imports: [CharacterCardComponent,
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

    fixture = TestBed.createComponent(CharacterCardComponent);
    component = fixture.componentInstance;
    component.character = {
      id: 1,
      name: 'Rick',
      status: 'Alive',
      species: 'Human',
      image: 'https://rick.com/image.jpg',
      location: { name: 'Earth' }
    };
    fixture.detectChanges();
  });

  const mockCharacter: ICharacter = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    image: 'https://rick.com/image.jpg',
    location: { name: 'Earth' },
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render character name and image', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Rick');
    expect(compiled.querySelector('img')?.src).toContain(mockCharacter.image);
  });
});
