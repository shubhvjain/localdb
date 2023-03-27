import { Component ,Input} from '@angular/core';

@Component({
  selector: 'export-json',
  templateUrl: './export-json.component.html',
  styleUrls: ['./export-json.component.css']
})
export class ExportJsonComponent {
  constructor(){
    this.title = " "
    this.content = {}
  }
  @Input() content :any;
  @Input() title :string;
  downloadContent(){
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent( JSON.stringify(this.content,null,2));
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", this.title + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}
