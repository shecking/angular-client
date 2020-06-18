// The following site was used to build authentication capabilities with Angular:
// https://jasonwatmore.com/post/2020/04/29/angular-9-basic-http-authentication-tutorial-example#fake-backend-ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// import { fakeBackendProvider } from './_helpers'
// ^ doesn't exist in this version (see branch auth-fake-api)
// To use a real backend, keep these lines commented out

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BasicAuthInterceptor } from './_helpers/basic-auth.interceptor'
import { ErrorInterceptor } from './_helpers/error.interceptor'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'

@NgModule({
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule
    ],
    declarations: [
      AppComponent,
      HomeComponent,
      LoginComponent
    ],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
      // fakeBackendProvider
    ],
    bootstrap: [AppComponent],
    // schemas: CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
})
export class AppModule { }
