import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SocailLinkComponent } from './components/socail-link/socail-link.component';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ScelitonComponent } from './components/sceliton/sceliton.component';

@NgModule({ declarations: [
        AppComponent,
        HomePageComponent,
        PageNotFoundComponent,
        SocailLinkComponent,
        ScelitonComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        NgxSkeletonLoaderModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
