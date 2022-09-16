import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_DIALOG_HEADER } from 'src/app/globals/interfaces';

@Component({
  selector: 'map-dialog-header',
  templateUrl: './map-dialog-header.component.html',
  styleUrls: ['./map-dialog-header.component.scss']
})
export class MapDialogHeaderComponent implements OnInit {
  @Input() headerData: MAT_DIALOG_HEADER | undefined
  maxmizeFlag: boolean = false
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

  }
  maximizeMinimiseModal() {
    this.maxmizeFlag = !this.maxmizeFlag
    if (this.maxmizeFlag){
      const dialog = this.dialog.getDialogById(`${this.headerData?.id}`)
      dialog?.updateSize(this.headerData?.maxWidth, this.headerData?.maxHeight)
    }
    else{
      const dialog = this.dialog.getDialogById(`${this.headerData?.id}`)
      dialog?.updateSize(this.headerData?.defaultWidth, this.headerData?.defaultHeight)
    }
  }


}
