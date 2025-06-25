import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import {provideCacheableAnimationLoader,provideLottieOptions} from 'ngx-lottie'

import { routes } from './app/views/app.routes';
import { AppComponent } from './app/views/app.component';
import { provideHttpClient, HttpClient } from '@angular/common/http'; 
import { provideTranslateService, TranslateLoader,TranslateModule  } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { importProvidersFrom } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideAnimations } from '@angular/platform-browser/animations';
import player from 'lottie-web';
export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    
    provideTranslateService({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    importProvidersFrom(
      NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
      TranslateModule.forRoot({
        defaultLanguage: 'fr',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
      
    ),
    provideAnimations(),
    provideLottieOptions({player:()=> player}),
    provideCacheableAnimationLoader()
  ],
});
