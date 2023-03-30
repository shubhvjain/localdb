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
  message=""
  loaded:boolean= false
  schemaList = []
  schema = {}
  record = {}

  ngOnInit(){
    this.loadPage()
    .then(()=>{
      this.loaded = true
    }).catch(error=>{console.log(error)})
  }

  async loadPage(){
    try {
      this.schema = {}
      this.schemaList = []
      this.record = {} 
      await this.loadSchemaList()
    } catch (error) {
      console.log(error)
    }
  }
  
  async loadSchemaList(){
    let data:any = await this.ds.dbGet(this.dbName,"data-schema-settings")
    this.schemaList = data['data']['list']
    console.log(this.schemaList)
  }
  
  async selectSchema(schemaValue:any){
    try {
      let newValue = schemaValue['target']['value']
      if(!newValue){throw new Error("Invalid Schema")} 
      await this.loadSchema(newValue)
    } catch (error:any) {
      this.message = error.message
    }
  }

  async loadSchema(schemaName:any){
    try {
      this.schema = {}
      
    } catch (error:any) { 
      this.message = error.message
    }
  }
  
  setNewRecord(){
    this.record = {}
 
  }
  
  addNewRecord(){

  }
  
  resetPage(){
    this.loadPage()
  }


  

  test(){
    try {
      this.ds.testDB(this.dbName)   
    } catch (error) {
      console.log(error)
    }
   
  }

}
