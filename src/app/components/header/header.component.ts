import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingPath } from 'src/app/models/routing-path.model';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  /** Favorites path used for routerLink */
  favoritesPath = '/' + RoutingPath.FAVORITES;

  /** Create path used for routerLink */
  createPath = '/' + RoutingPath.ADD_EDIT;

  /** Map path used for routerLink */
  mapPath = '/' + RoutingPath.MAP;

  /** Aboute path used for routerLink */
  aboutePath = '/' + RoutingPath.ABOUTE;

  /** indicate whether the menu is open (mobile view) */
  isMenuOpen = false;

  /** indicate whether the settings menu is open */
  isSettingsOpen = false;

  constructor(private translate: TranslateService) { }

  /** Display menu button (mobile view) */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /** Display Settings menu */
  toggleSettings() {
    this.isSettingsOpen = !this.isSettingsOpen;
  }

  /** Close menus on clickong outside */
  closeAll() {
    this.isMenuOpen = false;
    this.isSettingsOpen = false;
  }

  /** Change languge (use i18n with TranslateService) */
  changeLang() {
    const bodyElement: HTMLBodyElement | any = document.body;
    if (this.translate.currentLang === 'en') {
      this.translate.use('he');
      if (bodyElement) bodyElement.style.direction = 'rtl';
    } else {
      this.translate.use('en');
      if (bodyElement) bodyElement.style.direction = 'ltr';
    }
  }

  /** Is the system language English */
  isEnglish(): boolean {
    return this.translate.currentLang === 'en';
  }
}
