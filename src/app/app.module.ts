import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingInterceptor } from './common/_helpers/loading.interceptor';
import { LoaderComponent } from './common/components/loader';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthInterceptor } from './common/_helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
