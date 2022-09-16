import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { GlobalConstants } from '../globals/GlobalConstants';
import { MAT_DIALOG_HEADER } from '../globals/interfaces';
import { Utils } from '../globals/Utils';
@Component({
  selector: 'map-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentDateTime:any
  _gc = GlobalConstants
  selectedDateFromCalendar = new Date()
  defaultBrightness:any=10
  welcomeNoteHeader : MAT_DIALOG_HEADER ={
    disableIcons : false,
    header : "Welcome Note",
    searchBox : false
  }
  @ViewChild('welcomeNote') welcomeNote: TemplateRef<any> | undefined;
  constructor(private datePipe: DatePipe, private dialog : MatDialog) { }
  ngOnInit(): void {
    let day = Utils.getDayShortName(new Date().getDay()-1)
    setInterval(()=>{
      this.currentDateTime = day +" "+this.datePipe.transform(new Date(), 'MMM dd  hh:mm:ss')
    },1000)
    setTimeout(() => {
      this.openWelcomeNoteModal()
    }, 200);
    // this.getCurrentLocation()
  }
  getCurrentLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(res=>{
        console.log(res)
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    navigator.permissions.query({ name: 'geolocation' })
    .then(console.log)
  }
  onBrightnessSliderChange(event:any){
    let brigntessVar = 0.2
    if(+event.target.value === 0 || +event.target.value === 1){
      this.defaultBrightness = 0.2
      brigntessVar = 0.2
    }else if(+event.target.value === 10){
      this.defaultBrightness = 10
      brigntessVar = 1
    }else{
      brigntessVar = +("0."+event.target.value)
      this.defaultBrightness = event.target.value
    }
    let root = document.documentElement;
    root.style.setProperty('--brightnessVariable', `${brigntessVar}`);
  }
  openWelcomeNoteModal(){
    if(this.welcomeNote){
      const taskModal = this.dialog.open(this.welcomeNote, {
        ...this._gc.macintoshModal,
        width : '30vw'
      })
    }
  }

}
