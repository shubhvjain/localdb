import { Injectable } from '@angular/core';

import PouchDB from 'pouchdb'
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }
  
  dbSettingKey = "localdbsettings23"
  dbSetting = {
    get:()=>{
      let data =  localStorage.getItem(this.dbSettingKey) || `{ "list":[],"updated":"" }`
      return JSON.parse(data)
    },
    set:(newData:any)=>{
      // validate data here 
      localStorage.setItem(this.dbSettingKey, JSON.stringify( newData))
      return true
    }
  }
  getDBList(){
    return this.dbSetting.get()
  }
  editDBList(updatedData:any){
    this.dbSetting.set(updatedData)
  }

  getDBDetails(dbName:string){
    let setting = this.getDBList()
    let rec = setting.list.find((itm: { name: string; })=>{return itm.name == dbName})
    if(rec){return rec}else{throw new Error("404 DB Not Exists")}
  }

  async testDB(dbName:string){
    let dbdets = this.getDBDetails(dbName)
    let localDB  = new PouchDB(dbName) 
    localDB.info().then(function (info) {
      console.log(info);
    })
    let data = {
      sample: 1,
      random :Math.random(),
      dt : new Date().toISOString()
    }
    await localDB.post(data)
    console.log()
    let remoteDB = new PouchDB(dbdets.sync)
    localDB.sync(remoteDB)
  }


  getNewRecord(){
    let newRec:any = {
      _attachments:{},
      schema:"",
      data: {},
      meta:{
        createdOnUTC:"",
        updatedOnUTC:"",
        createdDevice:"",
      },
      settings : {
        secure: false,
      }
    }
    return newRec
  }
  addDefaultDynamicData(rec:any){
    let newRec = {...rec}
    let getCurrentUTCTS = ()=>{
      
    } 
    newRec.meta.createdDevice = window.navigator.userAgent
  }
  defualtSchemas(){
    const schemas = [
      {
        "_id":"schema1",
        schema:"data-schema",
        data:{
          name:"data-schema",
          label:"Data Schema",
          schema:{
            
          },
          primaryKey:[],
          validate:"",

        },

      }

    ]
  }

  async seedDefaultRecord(dbName:any){
    let defaultDocs = [
      {
        _id: "data-schema-settings",
        schema:"data-schema-settings",
        data:{
          list:[
            {name:"data-schema",label:"Data Schema"},
            {name:"custom-config-doc",label:"Config Doc"},
          ]
        },
        tags:["admin","added-by-system"],
      }
    ]
    let localDB  = new PouchDB(dbName) 
    await localDB.bulkDocs(defaultDocs)
  }


}
