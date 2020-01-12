import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { Tela1Component } from './tela1/tela1.component';
import { Tela2Component } from './tela2/tela2.component';

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        Tela1Component,
        Tela2Component
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        Tela1Component,
        Tela2Component
    ]
})
export class AppModule { }
