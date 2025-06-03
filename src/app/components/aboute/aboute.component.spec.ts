import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbouteComponent } from './aboute.component';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('AbouteComponent', () => {
  let component: AbouteComponent;
  let fixture: ComponentFixture<AbouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AbouteComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AbouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
