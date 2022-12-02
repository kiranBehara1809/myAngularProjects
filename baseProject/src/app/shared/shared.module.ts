import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapDialogHeaderComponent } from './map-dialog-header/map-dialog-header.component';



@NgModule({
  declarations: [
    MapDialogHeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MapDialogHeaderComponent
  ]
})
export class SharedModule { }
