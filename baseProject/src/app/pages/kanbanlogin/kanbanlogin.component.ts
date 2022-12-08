import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  usersList:any=[]
  addUserForm: FormGroup;
  loginForm: FormGroup;
  constructor(private datePipe: DatePipe, private dialog: MatDialog, private globalService: GlobalService, private commonService: CommonService, private fb: FormBuilder, private router:Router,private window : Window) {
    this.addUserForm = this.fb.group({
      firstName: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(8), Validators.minLength(3), Validators.pattern(this._regex.ALPHABETS_ONLY)])),
      lastName: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(8), Validators.minLength(3), Validators.pattern(this._regex.ALPHABETS_ONLY)])),
      userEmail: new FormControl(null, Validators.compose([Validators.email, Validators.required])),
      isAdmin: new FormControl(false, Validators.compose([Validators.required]))
    });
    this.loginForm = this.fb.group({
      userName : new FormControl(null, Validators.compose([Validators.required])),
      password : new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    this.getAllUsers()
    this.commonService.getBatteryDetails()
  }
  ngAfterViewInit() {
    this.showKanbanWelcomeModal()
  }

  showKanbanWelcomeModal() {
    if (this.kanbanWelcomeNote) {
      this.matDialogHeader = {
        header: 'Kanban',
        hideIcons: false,
        id: 'welcomeNoteModal',
        enableOnlyClose: true
      }
      const welcomeModal = this.dialog.open(this.kanbanWelcomeNote, {
        ...this._gc.macintoshModal,
        id: 'welcomeNoteModal',
        width: this.commonService.getModalWidth('30vw')
      })
      welcomeModal.afterClosed().subscribe(res => {
        sessionStorage.setItem("KANBAN_MODAL_STATUS", 'accepted')
        this.matDialogHeader = undefined
      })
    }
  }

  getAllUsers(){
    const payload = {
      operation: "sql",
      sql : "SELECT * FROM kanban.users"
    } 
    this.globalService.harperPost(payload).subscribe(res => {
      this.usersList = res || []
    })
  }
  addNewUser() {
    this.matDialogHeader = {
      header: 'Add User',
      hideIcons: false,
      maxWidth: this.commonService.getModalWidth('60vw'),
      defaultWidth: this.commonService.getModalWidth('30vw'),
      maxHeight: '100vh',
      defaultHeight: '100vh',
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
      this.addUserForm.reset()
      this.matDialogHeader = undefined
    })
  }
  getFormErrorMessage(formGrp: FormGroup, formControlName: string) {
    const fg: FormGroup = formGrp
    return this.commonService.getFormFieldErrorMessage(fg, formControlName)
  }

  saveUser() {
    const payload = {
      operation: "insert",
      schema: "kanban",
      table: "users",
      records : [
        {
          ...this.addUserForm.value,
          userName : this.addUserForm.value.firstName.substring(0,3)+"_"+this.addUserForm.value.lastName.substring(0,3)
        }
      ]
    }
    this.globalService.harperPost(payload).subscribe(res => {
      this.commonService.openSnackBar("User Created Succesfully", this._gc.SNACK_TOASTER_SUCCESS)
      this.commonService.closeDialogById("addUserModal")
    }, err=>{
      this.commonService.openSnackBar("Error Occured!", this._gc.SNACK_TOASTER_ERROR)
    })
  }
  login(){
    if(this.loginForm.value.password === "SimbaIsAGoodBoy"){
      this.commonService.openSnackBar("Login Successful", this._gc.SNACK_TOASTER_SUCCESS)
      this.router.navigateByUrl(`pages/kanban`)
    }else{
      this.commonService.openSnackBar("Incorrect Password", this._gc.SNACK_TOASTER_ERROR)
    }
  }
}
