import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatabaseRoutingModule } from './database-routing.module';
import { DatabaseComponent } from './database.component';
import { ViewerComponent } from './viewer/viewer.component';
import { NewRecordComponent } from './new-record/new-record.component';
import { ModifyRecordComponent } from './modify-record/modify-record.component';
import { SearchRecordComponent } from './search-record/search-record.component';


@NgModule({
  declarations: [
    DatabaseComponent,
    ViewerComponent,
    NewRecordComponent,
    ModifyRecordComponent,
    SearchRecordComponent
  ],
  imports: [
    CommonModule,
    DatabaseRoutingModule
  ]
})
export class DatabaseModule { }
