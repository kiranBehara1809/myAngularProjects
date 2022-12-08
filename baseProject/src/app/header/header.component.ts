import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlider, MatSliderChange } from '@angular/material/slider';
import { GlobalConstants } from '../globals/GlobalConstants';
import { MAT_DIALOG_HEADER } from '../globals/interfaces';
import { Utils } from '../globals/Utils';
import { MapReminderComponent } from '../commonComponents/map-reminder/map-reminder.component'
import { GlobalService } from '../services/global.service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
@Component({
  selector: 'map-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentDateTime: any
  _gc = GlobalConstants
  batteryObject:any=null;
  selectedDateFromCalendar = new Date()
  defaultBrightness: any = 10
  matDialogHeader: MAT_DIALOG_HEADER | undefined
  @ViewChild('welcomeNote') welcomeNote: TemplateRef<any> | undefined;

  constructor(private datePipe: DatePipe, private dialog: MatDialog, private globalService : GlobalService, private commonService :CommonService, private route : Router) { }

  ngOnInit(): void {
    this.commonService.getBatteryDetails().then(res =>{
      this.batteryObject = res || null
      console.log(this.batteryObject.level)
     })
    const dayNum = new Date().getDay() === 0 ? 0 : new Date().getDay() -1
    let day = Utils.getDayShortName(dayNum)
    setInterval(() => {
      this.currentDateTime = day + " " + this.datePipe.transform(new Date(), 'MMM dd  hh:mm:ss')
    }, 1000)
    setTimeout(() => {
      this.openWelcomeNoteModal()
    }, 200);
    // this.getCurrentLocation()
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(res => {
        console.log(res)
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
    navigator.permissions.query({ name: 'geolocation' })
      .then(console.log)
  }

  onBrightnessSliderChange(event: MatSliderChange) {
    let brigntessVar = 0.2
    if (event.value === 0 || event.value === 1) {
      this.defaultBrightness = 0.2
      brigntessVar = 0.2
    } else if (event.value === 10) {
      this.defaultBrightness = 10
      brigntessVar = 1
    } else {
      brigntessVar = +("0." + event.value)
      this.defaultBrightness = event.value
    }
    let root = document.documentElement;
    root.style.setProperty('--brightnessVariable', `${brigntessVar}`);
  }

  openWelcomeNoteModal() {
    if (this.welcomeNote) {
      this.globalService.get(`welcomeNote`).subscribe((res:any)=>{
        const docId = document.getElementById('welcomeNote')
        if(docId)
          docId.innerHTML = res.note
      })
      this.matDialogHeader = {
        hideIcons: true,
        header: "Welcome Note",
      }
      if(sessionStorage.getItem("WELCOME_MODAL_STATUS") === 'accepted'){
        return
      }
      let mobile = window.matchMedia("(max-width: 600px)")
      let tablet = window.matchMedia("(max-width: 900px)")
      const welcomeModal = this.dialog.open(this.welcomeNote, {
        ...this._gc.macintoshModal,
        id: 'welcomeNoteModal',
        width: mobile.matches ? '100vw' : (tablet.matches ? '60vw' : '30vw'),
      })
      welcomeModal.afterClosed().subscribe(res=>{
        sessionStorage.setItem("WELCOME_MODAL_STATUS",'accepted')
        this.matDialogHeader = undefined
        if (!("Notification" in window)) {
          return
        }
      })
    }
  }
 
  openReminderModal(){
    let mobile = window.matchMedia("(max-width: 600px)")
      let tablet = window.matchMedia("(max-width: 900px)")
      const reminderModal = this.dialog.open(MapReminderComponent,{
        ...this._gc.macintoshModal,
        position : {top :'top',right : 'right'},
        width : mobile.matches ? '100vw' : (tablet.matches ? '60vw' : '30vw'),
        height :'100vh',
        maxWidth : mobile.matches ? '100vw' : (tablet.matches ? '60vw' : '50vw'),
        id :'reminderModal'
      })
  }
  openSettings(){
    this.route.navigateByUrl(`pages/settings`)
  }
  getBgColor(){
    const batteryLevel = this.batteryObject?.level * 100
    return {
      'background-color' : batteryLevel <=25 ? 'red' : (batteryLevel <= 80 ? 'orange' : 'green'),
      'color' : (batteryLevel <=25 || batteryLevel >= 80) ? 'white' : 'black'
    }
  }
}
