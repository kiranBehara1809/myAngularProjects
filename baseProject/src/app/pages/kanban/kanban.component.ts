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
  
  addNew(){
    this.bottomSheet.open(this.add)
  }
}
