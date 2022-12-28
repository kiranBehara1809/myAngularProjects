import { Component, HostListener, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Utils } from './globals/Utils';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  // @HostListener('contextmenu', ['$event'])
  // onRightClick(event:any) {
  //   event.preventDefault();
  // }
  sideNavMode : MatDrawerMode = 'side'
  constructor(){
    document.body.className = 'mat-typography defaultTheme'
    const sessionColor = sessionStorage.getItem("MATERIAL_COMPONENT_COLOR")
    if(sessionColor != null && sessionColor != undefined ){
      let root = document.documentElement;
      root.style.setProperty('--materialComponentColor', `${sessionColor}`)
    }
  }
  title = 'baseProject';
  ngOnInit(): void {
    let mobile = window.matchMedia("(max-width: 600px)");
    let tablet = window.matchMedia("(max-width: 900px)");
    if(mobile.matches || tablet.matches){
      this.sideNavMode = 'over'
    }
  }
 
}
