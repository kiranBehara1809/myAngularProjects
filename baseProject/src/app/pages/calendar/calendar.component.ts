import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  offSetWidth:any;
  offSetHeight:any;
  constructor() { }

  ngOnInit(): void {
    this.offSetWidth = document.getElementById('foo')?.offsetWidth;
    this.offSetHeight = document.getElementById('foo')?.offsetHeight;
  }
  getStyles(){
    return {
      width : (+this.offSetWidth - 50) + 'px',
      height : (+this.offSetHeight - 20) + 'px',
      overflow : 'auto',
      background : 'transparent'
    }
  }

}
