import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'map-footer-dock',
  templateUrl: './footer-dock.component.html',
  styleUrls: ['./footer-dock.component.scss']
})
export class FooterDockComponent implements OnInit {
  footerDockList:string[] = ['calculator.png', 'settings.png', 'weather.png', 'calendar.png', 'reminders.png']
  hoverClass:string=''
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    // this.commonService.getWeatherData().subscribe(res=>{
    //   console.log(res)
    // })
  }

}
