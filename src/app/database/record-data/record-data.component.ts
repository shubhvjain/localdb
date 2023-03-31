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


  schemaList = []
  schema = {}
  record = {}

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
    this.schemaList = []
    this.schemaSelected = false

    let data:any = await this.ds.dbGet(this.dbName,"data-schema-settings")
    this.schemaList = data['data']['list']
  }

  async selectSchemaForNewRecord(schemaValue:any){
    try {
      let newValue = schemaValue['target']['value']
      if(!newValue){
        this.schemaSelected=false
        throw new Error("Invalid Schema")
      } 
      console.log(newValue)
      await this.loadSchema(newValue)
    } catch (error:any) {
      //this.message = error.message
    }
  }
  async loadSchema(schemaName:any){
    try {
      this.schema = {}
      this.record = {}
      this.schemaSelected = false

      const defaultSchemas:any = {
        "data-schema":{
          "schema": {
            "type":"object",
            "title":"New Data schema",
            "properties":{
              "name":{
                "title":"Name",
                "type":"string"
              },
              "label":{
                "title":"Schema label",
                "type":"string"
              },
              "structure":{
                "type":"string",
                "title":"JSON Schema Structure",
                "format":"textarea",
                "default":"{\"schema\":{}}",
                "options": {
                  "inputAttributes": {
                    "rows":10
                  }
                }
              },
              "dataValidation":{
                "title":"Data validation method",
                "type":"string",
                "format":"textarea",
                "default":"(data)=>{return data}",
                "options": {
                  "inputAttributes": {
                    "rows":5
                  }
                }
              },
              "primaryKey":{
                "title":"Primary keys",
                "description":"Include 'data.' before a field name",
                "type": "array",
                "format": "table",
                "uniqueItems": true,
                "items": {
                  "title":"Field name",
                  "type": "string",
                },
                "default":["_id"]
              },
              "view":{
                "title":"Data view",
                "type":"object",
                "properties":{
                  "short":{
                    "type":"string",
                    "format":"textarea",
                    "default":"",
                    "options": {"inputAttributes": {"rows":2}}
                  },
                  "full":{
                    "type":"string",
                    "format":"textarea",
                    "default":"",
                    "options": {"inputAttributes": {"rows":5}}
                  }
                }
              },
              "doc":{
                "title":"Documentation",
                "type":"string",
                "format":"textarea",
                "default":"",
                "options": {"inputAttributes": {"rows":5}}
              },

            },
            "required":["name","structure"]
          }
        }
      //  "custom-config-doc":{}
      }
      if(defaultSchemas[schemaName]){
        this.schemaSelected = false
        let sch = defaultSchemas[schemaName]
        this.schema = {
          disable_collapse: true,
          disable_properties: true,
          no_additional_properties: true,    
          disable_array_delete_all_rows:false,

          ... sch
        } 
        console.log(this.schema)
        this.schemaSelected = true

      }else{

      }

    } catch (error:any) { 
      //this.message = error.message
    }
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

  test(){
    try {
      this.ds.testDB(this.dbName)   
    } catch (error) {
      console.log(error)
    }
   
  }

}
