import { Component } from '@angular/core';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.css']
})
export class FormPreviewComponent {
  optionString:string="{}"
  option= {}
  load = false
  showPreview(){
    try {
      this.load= false
      let sch = JSON.parse(this.optionString)
      this.option = {
        disable_collapse: true,
        disable_properties: true,
        no_additional_properties: true,
        schema:sch
      } 
      this.load = true

    } catch (error:any) { 
      alert(error.message)
    }

  }
}
