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
  updateData(d:any){}

  constructor(private ds : DatabaseService){
    this.dbName = ""
    this.mode = "new" // view
    this.dbId = "new"
   let s =  {
      disable_collapse: true,
      disable_properties: true,
      no_additional_properties: true,
      schema: {
        type: "object",
        title: "Car",
        properties: {
          make: {
            type: "string",
            enum: [
              "Toyota",
              "BMW",
              "Honda",
              "Ford",
              "Chevy",
              "VW"
            ]
          },
          model: {
            type: "string"
          },
          year: {
            type: "integer",
            enum: [
              1995, 1996, 1997, 1998, 1999,
              2000, 2001, 2002, 2003, 2004,
              2005, 2006, 2007, 2008, 2009,
              2010, 2011, 2012, 2013, 2014
            ],
            default: 2008
          },
          safety: {
            type: "integer",
            format: "rating",
            maximum: "5",
            exclusiveMaximum: false,
            readonly: false
          }
        }
      }
    }
  }


  ngOnInit(){
    this.loadMode()
  }


  schemaList = []
  schema = {}
  record = {}
  message = ""
  async loadNewRecord(){
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
      //this.message = error.message
    }
  }
  async loadSchema(schemaName:any){
    try {
      this.schema = {}
      
    } catch (error:any) { 
      //this.message = error.message
    }
  }

  loadMode(){
    if(this.mode=='new'){
      this.loadNewRecord()
    }
    if(this.mode=='edit'){

    }
  }

  test(){
    try {
      this.ds.testDB(this.dbName)   
    } catch (error) {
      console.log(error)
    }
   
  }

}
