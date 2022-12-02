import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/common.service';
import { GlobalConstants } from 'src/app/globals/GlobalConstants';
import { MAT_DIALOG_HEADER } from 'src/app/globals/interfaces';
import { REGEX } from 'src/app/globals/REGEX';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-kanbanlogin',
  templateUrl: './kanbanlogin.component.html',
  styleUrls: ['./kanbanlogin.component.scss']
})
export class KanbanloginComponent implements OnInit {
  matDialogHeader: MAT_DIALOG_HEADER | undefined
  @ViewChild('kanbanWelcomeNote') kanbanWelcomeNote: TemplateRef<any> | undefined;
  @ViewChild('addUserModal') addUserModal!: TemplateRef<any>;
  _gc = GlobalConstants;
  _regex = REGEX;
  addUserForm :FormGroup;
  constructor(private datePipe: DatePipe, private dialog: MatDialog, private globalService : GlobalService, private commonService :CommonService, private fb : FormBuilder) { 
    this.addUserForm = this.fb.group({
      firstName: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(8), Validators.minLength(6),Validators.pattern(this._regex.ALPHABETS_ONLY)])),
      lastName: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(8), Validators.minLength(6),Validators.pattern(this._regex.ALPHABETS_ONLY)])),
      userEmail : new FormControl(null, Validators.compose([Validators.email, Validators.required])),
      isAdmin : new FormControl(false, Validators.compose([Validators.required])),

    })

  }

  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.showKanbanWelcomeModal()
  }

  showKanbanWelcomeModal(){
    if(this.kanbanWelcomeNote){
      this.matDialogHeader = {
        header : 'Kanban',
        hideIcons : false,
        id: 'welcomeNoteModal',
        enableOnlyClose:true
      }
      const welcomeModal = this.dialog.open(this.kanbanWelcomeNote, {
        ...this._gc.macintoshModal,
        id: 'welcomeNoteModal',
        width: this.commonService.getModalWidth('30vw')
      })
      welcomeModal.afterClosed().subscribe(res=>{
        sessionStorage.setItem("KANBAN_MODAL_STATUS",'accepted')
        this.matDialogHeader = undefined
      })
    }
  }

  addNewUser(){
    this.matDialogHeader = {
      header : 'Add User',
      hideIcons : false,
      maxWidth : this.commonService.getModalWidth('60vw'),
      defaultWidth : this.commonService.getModalWidth('30vw'),
      maxHeight : '100vh',
      defaultHeight : '100vh',
      id: 'addUserModal'
    }
    const addUserModal = this.dialog.open(this.addUserModal, {
      ...this._gc.macintoshModal,
      position: { top: 'top', right: 'right' },
      width: this.commonService.getModalWidth('30vw'),
      height: '100vh',
      id: 'addUserModal',
      
    })
    addUserModal.afterClosed().subscribe(res => {
      this.matDialogHeader = undefined
    })
  }
  getFormErrorMessage(formGrp: FormGroup, formControlName: string) {
    const fg: FormGroup = formGrp
    return this.commonService.getFormFieldErrorMessage(fg, formControlName)
  }
}
