import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatabaseRoutingModule } from './database-routing.module';
import { DatabaseComponent } from './database.component';
import { ViewerComponent } from './viewer/viewer.component';


@NgModule({
  declarations: [
    DatabaseComponent,
    ViewerComponent
  ],
  imports: [
    CommonModule,
    DatabaseRoutingModule
  ]
})
export class DatabaseModule { }
