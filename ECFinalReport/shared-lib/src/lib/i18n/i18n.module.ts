import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppTranslateLoader } from './apptranslateloader';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from './language.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: AppTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    LanguageService
  ]
})
export class I18nModule { }
