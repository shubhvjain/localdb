import { Component, Input } from '@angular/core';
import { DatabaseService } from '../../shared/database.service'; 

@Component({
  selector: 'app-new-record',
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.css']
})
export class NewRecordComponent {
  @Input() dbName :string;
  constructor(private ds : DatabaseService){
    this.dbName=""
  }
  test(){
    try {
      this.ds.testDB(this.dbName)   
    } catch (error) {
      console.log(error)
    }
   
  }

}
