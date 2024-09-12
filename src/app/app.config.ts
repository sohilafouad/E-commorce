import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes ,withViewTransitions()),
     provideClientHydration(),
     provideHttpClient(withFetch()),
    // importProvidersFrom(BrowserAnimationsModule)//de function btsm7 en a3ml import lae module//bs de tare2a adema
    provideAnimations(),//heya ht3ml import l BrowserAnimationsModule
    importProvidersFrom( SweetAlert2Module),
    provideToastr(), // Toastr providers

    ]
};
//withViewTransitions() to make el transistion smooth