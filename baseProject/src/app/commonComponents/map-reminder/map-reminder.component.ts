import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/common.service';
import { MAT_DIALOG_HEADER } from 'src/app/globals/interfaces';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'map-reminder',
  templateUrl: './map-reminder.component.html',
  styleUrls: ['./map-reminder.component.scss']
})
export class MapReminderComponent implements OnInit {
  matDialogHeader: MAT_DIALOG_HEADER = {
    hideIcons: false,
    header: "Add a Reminder",
    maxHeight: '100vh',
    maxWidth: '100vw',
    defaultHeight: '100vh',
    defaultWidth: '30vw',
    id: 'reminderModal'
  }
  reminderForm: FormGroup
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private commonService: CommonService, private globalService: GlobalService, private dialogRef: MatDialogRef<MapReminderComponent>) {
    this.reminderForm = this.fb.group({
      title: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(25)])),
      description: new FormControl(null, Validators.compose([Validators.maxLength(200)])),
      date: new FormControl(new Date()),
      time: new FormControl(null),
      showNotification: new FormControl(false)
    })
  }

  ngOnInit(): void {
    if (this.data) {
      this.reminderForm.patchValue({
        title: this.data.title,
        description: this.data.title,
        date: this.data.date,
        time: this.data.time,
        showNotification: this.data.showNotification
      })
    }
  }
  getFormErrorMessage(formGrp: FormGroup, formControlName: string) {
    const fg: FormGroup = formGrp
    return this.commonService.getFormFieldErrorMessage(fg, formControlName)
  }
  proceed(){
    if(this.data){
      this.updateReminder()
    }else{
      this.saveReminder()
    }
  }
  saveReminder() {
    this.globalService.post('reminders', this.reminderForm.value).subscribe(res => {
      const flag = this.commonService.showMessage(res)
      if (flag) return
      this.dialogRef.close(true)
      this.data = null
    })
  }
  updateReminder(){
    const payload = {
      ...this.reminderForm.value,
      _id : this.data._id,
      __v : this.data.__v
    }
    this.globalService.post('reminders/update', payload).subscribe(res => {
      const flag = this.commonService.showMessage(res)
      if (flag) return
      this.dialogRef.close(true)
      this.data = null
    })
  }
}


