import { Component, Input } from '@angular/core';

@Component({
  selector: 'search-record',
  templateUrl: './search-record.component.html',
  styleUrls: ['./search-record.component.css']
})
export class SearchRecordComponent {
  @Input() dbName:string;
  constructor(){this.dbName=''}

}
