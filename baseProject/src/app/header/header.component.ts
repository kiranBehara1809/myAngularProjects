import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';
import { GlobalConstants } from '../globals/GlobalConstants';
import { MAT_DIALOG_HEADER } from '../globals/interfaces';
import { Utils } from '../globals/Utils';
import { MapReminderComponent } from '../commonComponents/map-reminder/map-reminder.component'
@Component({
  selector: 'map-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentDateTime: any
  _gc = GlobalConstants
  selectedDateFromCalendar = new Date()
  defaultBrightness: any = 10
  matDialogHeader: MAT_DIALOG_HEADER | undefined
  @ViewChild('welcomeNote') welcomeNote: TemplateRef<any> | undefined;
  constructor(private datePipe: DatePipe, private dialog: MatDialog) { }
  ngOnInit(): void {
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
  onBrightnessSliderChange(event: any) {
    let brigntessVar = 0.2
    if (+event.target.value === 0 || +event.target.value === 1) {
      this.defaultBrightness = 0.2
      brigntessVar = 0.2
    } else if (+event.target.value === 10) {
      this.defaultBrightness = 10
      brigntessVar = 1
    } else {
      brigntessVar = +("0." + event.target.value)
      this.defaultBrightness = event.target.value
    }
    let root = document.documentElement;
    root.style.setProperty('--brightnessVariable', `${brigntessVar}`);
  }
  openWelcomeNoteModal() {
    if (this.welcomeNote) {
      this.matDialogHeader = {
        hideIcons: true,
        header: "Welcome Note",
      }
      const welcomeModal = this.dialog.open(this.welcomeNote, {
        ...this._gc.macintoshModal,
        id: 'welcomeNoteModal',
        width: '30vw',
      })
      welcomeModal.afterClosed().subscribe(res=>{
        this.matDialogHeader = undefined
        if (!("Notification" in window)) {
          return
        }
        let notificationPermission = Notification.permission
          if(notificationPermission === "default" ){
            this.requestAndShowPermission()
          }
      })
    }
  }
  requestAndShowPermission() {
    Notification.requestPermission(permission => {
      if(permission === "granted"){
        let title : string ="Welcome To MAP"
        let body:string ="This is a sample notification, thank you for accepting notifications"
        let sampleNotification = new Notification(title, {body})
      }
    });
  }
  openReminderModal(){
      const reminderModal = this.dialog.open(MapReminderComponent,{
        ...this._gc.macintoshModal,
        position : {top :'top',right : 'right'},
        width : '30vw',
        height :'100vh',
        maxWidth : '50vw',
        id :'reminderModal'
      })
  }
}
