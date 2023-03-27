import { Injectable } from '@angular/core';

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


}
