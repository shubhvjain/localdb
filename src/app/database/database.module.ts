import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DatabaseRoutingModule } from './database-routing.module';
import { DatabaseComponent } from './database.component';
import { ViewerComponent } from './viewer/viewer.component';
import { NewRecordComponent } from './new-record/new-record.component';
import { ModifyRecordComponent } from './modify-record/modify-record.component';
import { SearchRecordComponent } from './search-record/search-record.component';
import { JsonFormComponent } from './json-form/json-form.component';
import { RecordDataComponent } from './record-data/record-data.component';
@NgModule({
  declarations: [
    DatabaseComponent,
    ViewerComponent,
    NewRecordComponent,
    ModifyRecordComponent,
    SearchRecordComponent,
    JsonFormComponent,
    RecordDataComponent
  ],
  imports: [
    CommonModule,
    DatabaseRoutingModule,
    FormsModule

  ]
})
export class DatabaseModule { }
