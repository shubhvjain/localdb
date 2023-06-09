import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'json-form',
  templateUrl: './json-form.component.html',
  styleUrls: ['./json-form.component.css']
})
export class JsonFormComponent {
  @Input() data: any;
  @Input() options: any;
  @Output() onDataChange = new EventEmitter();
  editor: any
  JSONEditor:any
  editorId = ""
  loaded = false
  constructor() {
    //@ts-ignore https://stackoverflow.com/a/70167532
    this.JSONEditor = window['JSONEditor']

    this.data = {}
    this.options = {
      disable_collapse: true,
      disable_properties: true,
      no_additional_properties: true,
      schema: {}
    }
    this.loaded = true
    this.editorId = "editor-" + Math.floor(Math.random() * 1000)
  }
  loadForm() {
    const element:any = document.getElementById(this.editorId);
    element.innerHTML=""
     this.editor = new this.JSONEditor(element,this.options )
    this.editor.on('change', () => {
      const value = this.editor.getValue();
      this.data = value
      //console.log(this.data)
      this.onDataChange.emit(this.data)
    })
  }
  addFormData(){
    this.editor.setValue(this.data)
  }

  loadPage(){
    this.loaded = false
    let ang = this
    this.loaded = true
    setTimeout(function(){
      ang.loadForm()
      setTimeout(function(){
        ang.addFormData()
      },250)
    },250)
  }

  ngOnInit() {
    try {
      this.loadPage()
    } catch (error) {
      console.log(error)
    }
  }
  ngOnChanges(sm: SimpleChanges) {
    if (sm['options']) {
      this.options = sm['options'].currentValue 
      // console.log(this.options)
      this.loadPage()
    }
  }

}
