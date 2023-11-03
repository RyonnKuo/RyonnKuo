import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  language$ = new ReplaySubject<LangChangeEvent>(1);
  translate = this.translateService;
  languageSet: Set<string> = new Set();
  currentLang = 'en';

  constructor(
    private translateService: TranslateService,
    private storage: LocalStorageService
  ) {
    this.languageSet.add('en');
    this.languageSet.add('zh-cn');
  }

  setInitState(): void {
    const savedLanguage = this.savedLanguage;
    if (savedLanguage !== undefined && savedLanguage !== null) {
      this.setLang(savedLanguage);
    } else {
      const browserLang = this.getBrowserLang();
      this.setLang(browserLang);
    }
  }

  getBrowserLang() {
    const lang_cul = this.translate.getBrowserCultureLang().toLocaleLowerCase();
    var lang = this.translate.getBrowserLang().toLocaleLowerCase();
    console.log(`lang_cul / lang: ${lang_cul} / ${lang}`);
    if (this.languageSet.has(lang_cul))
      return lang_cul;
    if (lang == 'zh')
      lang = 'zh-tw';
    if (this.languageSet.has(lang))
      return lang;
    return 'en';
  }

  setLang(lang: string): void {
    this.translateService.onLangChange.pipe(take(1)).subscribe(result => {
      this.language$.next(result);
      this.currentLang = result.lang;
    });
    this.translateService.use(lang);
  }

  set savedLanguage(lang: string) {
    this.storage.store('SavedLanguage', lang);
  }

  get savedLanguage() {
    return this.storage.retrieve('SavedLanguage');
  }
}
