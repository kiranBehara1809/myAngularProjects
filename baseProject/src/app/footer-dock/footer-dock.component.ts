import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'map-footer-dock',
  templateUrl: './footer-dock.component.html',
  styleUrls: ['./footer-dock.component.scss']
})
export class FooterDockComponent implements OnInit {
  footerDockList: string[] = ['calculator.png', 'settings.png', 'weather.png',   'covidDashboard.png', 'nasa.png', 'railway.png']
  // 'reminders.png' 'calendar.png',
  hoverClass: string = ''
  @ViewChild('rightClickMenu') rightClickMenu: MatMenuTrigger | undefined
  constructor(private commonService: CommonService, private route: Router) { }

  ngOnInit(): void {
    // this.commonService.getWeatherData().subscribe(res=>{
    //   console.log(res)
    // })
  }

  changeRoute(route: string) {
    this.route.navigateByUrl(`pages/${route.split(".")[0]}`)
  }
  onRightClick() {
    this.rightClickMenu?.openMenu()
    return false;
  }
}
