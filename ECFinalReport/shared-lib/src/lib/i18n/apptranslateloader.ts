import { TranslateLoader } from "@ngx-translate/core";
import { merge, Observable } from "rxjs";
import { reduce } from "rxjs/operators";

export class AppTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    const $firstFile = import(`../../shared_assets/i18n/${lang}.json`);
    // const $secondFile = import(`../../../../uxauth/src/uxauth_assets/i18n/${lang}.json`);
    const reducer = (translations, val) => {
      return Object.assign(translations, val);
    };
    return merge($firstFile).pipe(reduce(reducer, {}));
  }
}
