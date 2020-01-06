import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ServiceProxyModule } from 'src/shared/service-proxy/service-proxy.module';
import { HttpClientModule } from '@angular/common/http';
import { StarshipCardComponent } from './starship-card/starship-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatCardModule} from '@angular/material/card';
import { CompetitionBoardComponent } from './competition-board/competition-board.component';


const MaterialModules = [MatCardModule];

@NgModule({
   declarations: [
      AppComponent,
      CompetitionBoardComponent,
      StarshipCardComponent
   ],
   imports: [
      BrowserModule,
      RouterModule.forRoot(AppRoutes),
      ServiceProxyModule,
      HttpClientModule,
      BrowserAnimationsModule,
      ...MaterialModules
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
