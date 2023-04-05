import { Injectable } from '@angular/core';
import pouchdbfind from 'pouchdb-find';
import PouchDB from 'pouchdb'
PouchDB.plugin(pouchdbfind);
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor() { }
  dbSettingKey = "localdbsettings23"
  dbSetting = {
    get: () => {
      let data = localStorage.getItem(this.dbSettingKey) || `{ "list":[],"updated":"" }`
      return JSON.parse(data)
    },
    set: (newData: any) => {
      // validate data here 
      localStorage.setItem(this.dbSettingKey, JSON.stringify(newData))
      return true
    }
  }
  getDBList() {
    return this.dbSetting.get()
  }
  editDBList(updatedData: any) {
    this.dbSetting.set(updatedData)
  }

  getDBDetails(dbName: string) {
    let setting = this.getDBList()
    let rec = setting.list.find((itm: { name: string; }) => { return itm.name == dbName })
    if (rec) { return rec } else { throw new Error("404 DB Not Exists") }
  }

  async testDB(dbName: string) {
    let dbdets = this.getDBDetails(dbName)
    let localDB = new PouchDB(dbName)
    localDB.info().then(function (info) {
      //console.log(info);
    })
    let data = {
      sample: 1,
      random: Math.random(),
      dt: new Date().toISOString()
    }
    await localDB.post(data)
    //console.log()
    let remoteDB = new PouchDB(dbdets.sync)
    localDB.sync(remoteDB)
  }

  async syncDB(dbName: string) {
    let dbdets = this.getDBDetails(dbName)
    let localDB = new PouchDB(dbName)
    let remoteDB = new PouchDB(dbdets.sync)
    await localDB.sync(remoteDB)
  }


  getNewRecord() {
    let newRec: any = {
      _attachments: {},
      schema: "",
      data: {},
      meta: {
        createdOnUTC: "",
        updatedOnUTC: "",
        createdDevice: "",
      },
      settings: {
        secure: false,
        tags: []
      }
    }
    return newRec
  }
  addDefaultDynamicData(rec: any) {
    let newRec = { ...rec }
    let getCurrentUTCTS = () => {

    }
    newRec.meta.createdDevice = window.navigator.userAgent
  }
  async seedDefaultRecord(dbName: any) {
    let defaultDocs = [
      {
        _id: "data-schema-settings",
        schema: "data-schema-settings",
        data: {
          list: []
        },
        tags: ["admin", "added-by-system"],
      }
    ]
    let localDB = new PouchDB(dbName)
    await localDB.bulkDocs(defaultDocs)
    await this.generateDefaultIndex(dbName)
  }


  async generateDefaultIndex(dbName: any) {
    try {
      let localDB = new PouchDB(dbName)
      var result = await localDB.createIndex({
        index: {
          fields: ['data.schema']
        }
      })
      console.log(result)
    } catch (err) {
      console.log(err);
    }


  }

  async loadDataSchemas(dbName: any, schemaName: any) {
    try {
      const defaultSchemas: any = {
        "data-schema": {
          "name": "data-schema",
          "primaryKey": ["name"],
          "dataValidation": `(data)=>{
            data.name = data.name.trim().replace(\/\\s+\/g,'-').toLowerCase()
            return data
          }`,
          "label": "",
          "schema": {
            "type": "object",
            "title": "New Data schema",
            "properties": {
              "name": {
                "title": "Name",
                "type": "string"
              },
              "label": {
                "title": "Schema label",
                "type": "string"
              },
              "schemaString": {
                "type": "string",
                "title": "JSON Schema Structure",
                "format": "textarea",
                "default": "\{\"schema\":\{\}\}",
                "options": {
                  "inputAttributes": {
                    "rows": 10
                  }
                }
              },
              "dataValidation": {
                "title": "Data validation method",
                "type": "string",
                "format": "textarea",
                "default": "(data)=>{return data}",
                "options": {
                  "inputAttributes": {
                    "rows": 5
                  }
                }
              },
              "primaryKey": {
                "title": "Primary keys",
                "description": "Include 'data.' before a field name",
                "type": "array",
                "format": "table",
                "uniqueItems": true,
                "items": {
                  "title": "Field name",
                  "type": "string",
                },
                "default": []
              },
              "view": {
                "title": "Data view",
                "type": "object",
                "properties": {
                  "table":{
                    "description":"Columns to display in table view",
                    "type":"array",
                    "format":"table",
                    "uniqueItems": true,
                    "default": [],
                    "items": {
                      "title": "Field name",
                      "type": "string",
                    },
                  },
                  "short": {
                    "type": "string",
                    "format": "textarea",
                    "default": "",
                    "options": { "inputAttributes": { "rows": 2 } }
                  },
                  "full": {
                    "type": "string",
                    "format": "textarea",
                    "default": "",
                    "options": { "inputAttributes": { "rows": 5 } }
                  }
                }
              },
              "doc": {
                "title": "Documentation",
                "type": "string",
                "format": "textarea",
                "default": "",
                "options": { "inputAttributes": { "rows": 5 } }
              },

            },
            "required": ["name", "schemaString"]
          }
        }
      }

      if (defaultSchemas[schemaName]) {
        let sch = defaultSchemas[schemaName]
        let schema = {
          disable_collapse: true,
          disable_properties: true,
          no_additional_properties: true,
          disable_array_delete_all_rows: false,
          ...sch
        }
        return schema
      } else {
        let localDB = new PouchDB(dbName)
        let rec = await localDB.find({ selector: { "data.name": schemaName, "schema": "data-schema" } })
        if (rec.docs.length == 0) { throw new Error("Schema not found") }
        let sch: any = rec.docs[0]
        let schemaScript = `return ${sch['data']['schemaString']}`
        const scriptMethod = new Function(schemaScript);
        const queryData = scriptMethod()
        sch['data'].schema = queryData['schema']
        let schema = {
          disable_collapse: true,
          disable_properties: true,
          no_additional_properties: true,
          disable_array_delete_all_rows: false,
          ...sch['data']
        }
        return schema
      }
    } catch (error) {
      console.log(error)
    }
  }
  getDefaultSchemaList(){
    return [
      {
        "name": "data-schema",
        "label": "Data Schema"
      },
      {
        "name": "topic",
        "label": "Topic"
      },
      {
        "name": "reference",
        "label": "Reference"
      },
      {
        "name": "word",
        "label": "Word"
      },
      {
        "name": "phrase",
        "label": "Phrase"
      },
      {
        "name": "script",
        "label": "Script"
      },
      {
        "name": "local-app",
        "label": "Local webapp"
      },
      {
        "name": "custom-config-doc",
        "label": "Config Doc"
      } 
    ]
  }
  async getSchemaList(dbName:any){
    let defaulsSchemaList = this.getDefaultSchemaList()
    let schemaList = []
    let data:any = await this.dbGet(dbName,"data-schema-settings")
    schemaList = data['data']['list']
    schemaList = schemaList.concat(defaulsSchemaList)
    return schemaList
  }

  async addNewSchemaToList(dbName: string, newData: any) {
    const localDB = new PouchDB(dbName)
    let rec: any = await localDB.get("data-schema-settings")
    rec['data']['list'].push(newData)
    await localDB.put(rec)
    // todo add index to db (use all primary keys)
  }

  async duplicateCheck(dbName: string, schema: any, newRecord: any) {
    if (schema.primaryKey.length > 0) {
      let query: any = { selector: { "schema": schema.name } }
      schema.primaryKey.map((item: string | number) => {
        query.selector["data." + item] = newRecord['data'][item]
      })
      const localDB = new PouchDB(dbName)
      let search = await localDB.find(query)
      if (search.docs.length > 0) { throw new Error("Record already exists") }
    }
  }

  async dbInsert(dbName: string, newRecord: any) {
    try {
      await this.syncDB(dbName)
      // validate data
      // primary key check
      let schemaOption: any = await this.loadDataSchemas(dbName, newRecord['schema'])
      //console.log(schemaOption)
      await this.duplicateCheck(dbName, schemaOption, newRecord)
      // let validData = 
      let validData = eval(schemaOption['dataValidation'])(newRecord.data)
      // console.log(validData)
      //  this.data = JSON.parse(JSON.stringify(dt))
      // insert data
      let localDB = new PouchDB(dbName)
      let newRec = await localDB.post(newRecord)

      // do extra things  
      if (newRecord['schema'] == "data-schema") {
        await this.addNewSchemaToList(dbName, { name: newRecord['data']['name'], label: newRecord['data']['label'] })
      }
      await this.syncDB(dbName)
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  async dbGet(dbName: any, id: any) {
    let localDB = new PouchDB(dbName)
    let data = await localDB.get(id)
    return data
  }
  async dbUpdate(dbName: any, id: any, updatedDoc: any) { }
  async dbDelete(dbName: any, id: any) { }
  async dbSearch(dbname: any, query: any) { }
}