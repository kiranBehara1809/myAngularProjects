import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'map-footer-dock',
  templateUrl: './footer-dock.component.html',
  styleUrls: ['./footer-dock.component.scss']
})
export class FooterDockComponent implements OnInit {
  footerDockList:string[] = ['calculator.png', 'settings.png', 'weather.png', 'calendar.png', 'reminders.png']
  hoverClass:string=''
  constructor() { }

  ngOnInit(): void {
  }

}
