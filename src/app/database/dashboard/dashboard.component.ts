import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DatabaseService } from '../../shared/database.service'; 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private activatedRoute: ActivatedRoute,private ds : DatabaseService){}
  loaded:boolean = false
  displayMsg = "Loading..."
  dbName:string = ""
  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: Params) => {
      //this.selectedPageId = params['link']; 
      // console.log(params)
      this.processParams(params)
    });
  }
  processParams(params:any){
    // check if db is valid 
    try {
      let dbcheck = this.ds.getDBDetails(params.dbname)
      if(dbcheck){
        //console.log(dbcheck)
        this.dbName = params.dbname
        this.loaded=true  
      }else{
        throw new Error("Invalid database")
      }
    } catch (error:any) {
      console.log(error)
      this.displayMsg = error.message
    }
  }
}
