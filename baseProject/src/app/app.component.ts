import { Component, OnInit } from '@angular/core';
import { Utils } from './globals/Utils';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(){
    const sessionColor = sessionStorage.getItem("MATERIAL_COMPONENT_COLOR")
    if(sessionColor != null && sessionColor != undefined ){
      let root = document.documentElement;
      root.style.setProperty('--materialComponentColor', `${sessionColor}`)
    }
  }
  title = 'baseProject';
  ngOnInit(): void {
    
  }
 
}
