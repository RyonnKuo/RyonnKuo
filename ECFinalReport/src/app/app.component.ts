import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'shared-lib/src/lib/i18n/language.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ECFinalReport';

  constructor(
    private languageService: LanguageService,
  ) {

  }

  async ngOnInit() {

  }

  getLangClass() {
    return this.languageService.currentLang;
  }
}

