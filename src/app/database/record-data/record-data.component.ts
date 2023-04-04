import { Component, Input } from '@angular/core';
import { DatabaseService } from '../../shared/database.service'; 

@Component({
  selector: 'record-data',
  templateUrl: './record-data.component.html',
  styleUrls: ['./record-data.component.css']
})
export class RecordDataComponent {

  @Input() dbName:string;
  @Input() mode:string;
  @Input() dbId:string

  loaded:boolean = true;
  schemaSelected:boolean = false
  message = ""

  updateData(d:any){}

  constructor(private ds : DatabaseService){
    this.dbName = ""
    this.mode = "new" // "view"
    this.dbId = "new"
  }


  ngOnInit(){
    this.loadMode()
  }


  schemaList:any = []
  schema:any = {}
  record:any = {}

  settingsSchema = {
    disable_collapse: true,
    disable_properties: true,
    no_additional_properties: true,
    disable_array_delete_all_rows:false,
    schema:{
      "type":"object",
      "title":"Record Settings",
      "properties":{
        "encrypt":{
          "title":"Encrypt data",
          "type":"boolean"
        },
        "tags":{
          "title":"Tags",
          "description":"",
          "type": "array",
          "format": "table",
          "uniqueItems": true,
          "maxItems":10,
          "items": {
            "title":"Tag name",
            "type": "string",
          },
        },
      }
    }
  }

  
  async loadNewRecordForm(){
    try {
      this.schema = {}
      this.record = {}
       
      await this.loadSchemaList()
    } catch (error) {
      console.log(error)
    }
  }
  async loadSchemaList(){
    this.schemaList = [
      {
        "name": "data-schema",
        "label": "Data Schema"
      },
      {
        "name": "custom-config-doc",
        "label": "Config Doc"
      } 
    ]
    this.schemaSelected = false

    let data:any = await this.ds.dbGet(this.dbName,"data-schema-settings")
    this.schemaList = this.schemaList.concat(data['data']['list'])
  }

  async selectSchemaForNewRecord(schemaValue:any){
    try {
      let newValue = schemaValue['target']['value']
      if(!newValue){
        this.schemaSelected=false
        throw new Error("Invalid Schema")
      } 
      // console.log(newValue)
      await this.loadSchema(newValue)
      this.loadNewRecordData()
    } catch (error:any) {
      //this.message = error.message
    }
  }
  async loadSchema(schemaName:any){
    try {
      this.schema = {}
      this.record = {}
      this.schemaSelected = false
      let dt = await this.ds.loadDataSchemas(this.dbName,schemaName)
      console.log(dt)
      this.schema = dt
      this.schemaSelected = true
    } catch (error:any) { 
      //this.message = error.message
    }
  }

  loadNewRecordData(){
    this.record =  this.ds.getNewRecord()
    this.record['schema'] = this.schema['name']
  }

  loadMode(){
    if(this.mode=='new'){
      this.loadNewRecordForm()
    }
    if(this.mode=='edit'){

    }
  }
  refreshNewForm(){
    this.loadNewRecordForm()    
  }

  updateNewFormData(field:any,data:any){
    //console.log(data)
    if(field =='data'){
      this.record['data'] = data
    }
    if(field=='settings'){
      this.record['settings'] = data
    }
    //console.log(this.record)
  }

  test(){
    try {
      this.ds.testDB(this.dbName)   
    } catch (error) {
      console.log(error)
    }
  }
  async addNewRecord(){
    if(this.schemaSelected){
      await this.ds.dbInsert(this.dbName,this.record)

    }
  }
  async syncDB(){
    await this.ds.syncDB(this.dbName)
  }
}
