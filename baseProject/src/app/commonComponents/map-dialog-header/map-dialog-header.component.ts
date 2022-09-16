import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_DIALOG_HEADER } from 'src/app/globals/interfaces';

@Component({
  selector: 'map-dialog-header',
  templateUrl: './map-dialog-header.component.html',
  styleUrls: ['./map-dialog-header.component.scss']
})
export class MapDialogHeaderComponent implements OnInit {
@Input() headerData : MAT_DIALOG_HEADER | undefined
  constructor() { }

  ngOnInit(): void {
  }

}
