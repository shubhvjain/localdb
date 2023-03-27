import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportJsonComponent } from './export-json/export-json.component';


@NgModule({
  declarations: [
    ExportJsonComponent
  ],
  imports: [CommonModule],
  exports:[CommonModule,ExportJsonComponent]
})
export class SharedModule { }