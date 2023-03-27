import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})
export class ViewerComponent {
  constructor(private activatedRoute: ActivatedRoute){}
  loaded:boolean = false
  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: Params) => {
      //this.selectedPageId = params['link']; 
      console.log(params)
      this.processParams(params)
      this.loaded=true  
    });
  }
  processParams(params:any){
    
  }
}
