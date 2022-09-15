import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Utils } from '../globals/Utils';
@Component({
  selector: 'map-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentDateTime:any
  selectedDateFromCalendar = new Date()
  defaultBrightness:any=1
  constructor(private datePipe: DatePipe) { }
  ngOnInit(): void {
    let day = Utils.getDayShortName(new Date().getDay()-1)
    setInterval(()=>{
      this.currentDateTime = day +" "+this.datePipe.transform(new Date(), 'MMM dd  hh:mm:ss')
    },1000)
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
  onBrightnessSliderChange(event:MatSliderChange){
    this.defaultBrightness = event.value
    let root = document.documentElement;
    root.style.setProperty('--brightnessVariable', `${event.value}`);
  }

}
