import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/common.service';
import { GlobalConstants } from 'src/app/globals/GlobalConstants';
import { GlobalService } from 'src/app/services/global.service';
import { MapReminderComponent } from '../map-reminder/map-reminder.component';

@Component({
  selector: 'map-reminders-listing',
  templateUrl: './reminders-listing.component.html',
  styleUrls: ['./reminders-listing.component.scss']
})
export class RemindersListingComponent implements OnInit {
  remindersList: any = []
  selectedObject: any;
  _gc = GlobalConstants;
  constructor(private globalService: GlobalService, private dialog: MatDialog, private commonService:CommonService) { }

  ngOnInit(): void {
    this.getReminders()
  }

  getReminders() {
    this.globalService.get('reminders').subscribe((res: any) => {
      this.remindersList = res?.map((c: any) => { return { ...c, class: '' } }) || []
    })
  }

  onReminderClick(reminder: any) {
    this.remindersList = this.remindersList?.map((c: any) => {
      return {
        ...c,
        class: reminder._id === c._id ? 'itemSelected' : ''
      }
    })
    this.selectedObject = this.remindersList.find((x: any) => x._id === reminder._id) || null
  }
  openReminderModal() {
    const reminderModal = this.dialog.open(MapReminderComponent, {
      ...this._gc.macintoshModal,
      position: { top: 'top', right: 'right' },
      width: '30vw',
      height: '100vh',
      maxWidth: '50vw',
      id: 'reminderModal',
      data : {
        ...this.selectedObject
      }
    })
    reminderModal.afterClosed().subscribe(res => {
      if (res){
        this.selectedObject = null 
        this.getReminders()
      }
    })
  }
  deleteReminder(){
    this.globalService.post('reminders/delete', {_id : this.selectedObject._id}).subscribe(res =>{
      const flag = this.commonService.showMessage(res)
      if (flag) return
      this.selectedObject = null 
      this.getReminders()
    })
  }
  showSampleNotification(){
    this.commonService.requestAndShowPermission(this.selectedObject?.title, this.selectedObject?.description)
  }
}
