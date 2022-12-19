import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { UserGameMainComponent } from './user-game-main/user-game-main.component';
import { IngameComponent } from './ingame/ingame.component';
import { WinnerComponent } from './winner/winner.component';


/**
 * Main Module, declarates and imports all the components necesaries for angular to run correctly
 * @author Jonathan Daniel Pinilla Forero
 * @version 1.0.0
 * @since 1.0.0 08-07-2022
 */
@NgModule({
  declarations: [
    AppComponent,
    UserGameMainComponent,
    routingComponents,
    IngameComponent,
    WinnerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
