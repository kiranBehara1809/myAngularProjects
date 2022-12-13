import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackba',
  templateUrl: './snackba.component.html',
  styleUrls: ['./snackba.component.scss']
})
export class SnackbaComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
  private _snackRef: MatSnackBarRef<SnackbaComponent>,
  ) { }

  ngOnInit(): void {
  }
  close(){
    this._snackRef.dismiss()
  }
}
