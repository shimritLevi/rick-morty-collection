import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCollectionComponent } from './character-collection.component';
import { CharacterService } from 'src/app/services/character.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

describe('CharacterCollectionComponent', () => {
  let component: CharacterCollectionComponent;
  let fixture: ComponentFixture<CharacterCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCollectionComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [CharacterService, provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
