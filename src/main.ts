// This main.ts file is used by Angular as an 'entry point', required to launch and boostrap the app

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
  if (window['ngRef']) {
    window['ngRef'].destroy()
  }
  window['ngRef'] = ref
})
  .catch(err => console.error(err));
