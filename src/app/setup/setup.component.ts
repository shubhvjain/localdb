import { Component } from '@angular/core';
import { DatabaseService } from '../shared/database.service'; 
@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent {
  constructor(private ds : DatabaseService){
    
  }
  dbSettings:any
  loaded:boolean = false;
  ngOnInit(){
    console.log(this.ds.getDBList())
    this.dbSettings = this.ds.getDBList()
    console.log(this.dbSettings)
    this.loaded = true
  }
  newdb=""
  async addNewDB(){
    try {
      let newName = this.newdb.trim().replace(/\s+/g, '-').toLowerCase()
      if(!newName){throw new Error("Empty")}

      let exists = this.dbSettings.list.find((itm: { name: string; }) =>{ return itm.name==newName})
      let genKey = (length:any)=>{
        // https://stackoverflow.com/a/1349426
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
      }
      if(!exists){
        this.dbSettings.list.push({
          name:newName,
          createdOn: new Date().toUTCString(),
          settings:{
            sync:"",
            key:genKey(30)
          }
        })
        this.ds.editDBList(this.dbSettings)
        this.ds.seedDefaultRecord(newName)
      }else{
        throw new Error("Database already exists")
      }      
    } catch (error:any) {
      alert(error.message)
    }

  }
  exportSettings(){}
  importSettingsFromJSON(){
    // file must first be validated, check list for duplicates
    // only new db must be added, 
  }
  saveChanges(){
    this.ds.editDBList(this.dbSettings)
  }
}
