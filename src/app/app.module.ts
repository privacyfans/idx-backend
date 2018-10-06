/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NbThemeModule } from '@nebular/theme';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';
import { NgxLoginComponent } from './pages/login/login.component'; 
//import { NgxNotificationComponent } from 'ngx-notification';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ScriptLoaderService } from './_services/script-loader.service';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [AppComponent,NgxLoginComponent,AlertComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    DataTablesModule,
    SweetAlert2Module.forRoot(),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbThemeModule.forRoot({ name: 'corporate' }),
  ],
  bootstrap: [AppComponent],
  providers: [
    ScriptLoaderService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
})
export class AppModule {
}
