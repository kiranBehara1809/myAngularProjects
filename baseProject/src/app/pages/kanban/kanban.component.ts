import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent implements OnInit {
  @ViewChild('add') add!: TemplateRef<any>;
  constructor(private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }
   openFullscreen() {
    let elem = document.getElementById("xyz") as any;
    if (elem?.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem?.webkitRequestFullscreen) { /* Safari */
      elem?.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem?.msRequestFullscreen();
    }
  }
  addNew(){
    this.bottomSheet.open(this.add)
  }
}
