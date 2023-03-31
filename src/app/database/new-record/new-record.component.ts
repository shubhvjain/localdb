import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-new-record',
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.css']
})
export class NewRecordComponent {
  @Input() dbName :string;
  constructor(){this.dbName=""}
  ngOnInit(){}
}
