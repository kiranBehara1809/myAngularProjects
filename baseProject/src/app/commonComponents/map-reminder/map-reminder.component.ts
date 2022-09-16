import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { MAT_DIALOG_HEADER } from 'src/app/globals/interfaces';

@Component({
  selector: 'map-reminder',
  templateUrl: './map-reminder.component.html',
  styleUrls: ['./map-reminder.component.scss']
})
export class MapReminderComponent implements OnInit {
  matDialogHeader:MAT_DIALOG_HEADER = {
    hideIcons: false,
    header: "Add a Reminder",
    maxHeight : '100vh',
    maxWidth:'100vw',
    defaultHeight :'100vh',
    defaultWidth :'30vw',
    id :'reminderModal'
  }
  reminderForm:FormGroup 
  constructor(private fb:FormBuilder, private commonService : CommonService) { 
    this.reminderForm = this.fb.group({
      title: new FormControl(null, Validators.compose([Validators.required,Validators.maxLength(20)])),
      description: new FormControl(null, Validators.compose([Validators.maxLength(200)])),
      date:new FormControl(new Date()),
      time:new FormControl(null)
    })
  }

  ngOnInit(): void {
  }
  getFormErrorMessage(formGrp:FormGroup, formControlName:string) {
    const fg: FormGroup = formGrp
    console.log(formGrp)
    return this.commonService.getFormFieldErrorMessage(fg, formControlName)
  }
  
  saveReminder(){
  }
}


