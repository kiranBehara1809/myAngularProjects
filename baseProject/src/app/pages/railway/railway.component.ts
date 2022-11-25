import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { GlobalConstants } from 'src/app/globals/GlobalConstants';
import { REGEX } from 'src/app/globals/REGEX';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-railway',
  templateUrl: './railway.component.html',
  styleUrls: ['./railway.component.scss']
})
export class RailwayComponent implements OnInit {
  searchForm : FormGroup; 
  selectedObject:any=null;
  searchedValue:string='6111772748';
  _gc = GlobalConstants;
  _regex = REGEX
  pnrData:any=undefined;
  availableEndpoints =[
    {
      id : 1,
      name :'PNR Status',
      class : ''
    },
    {
      id : 2,
      name :'Live Status',
      class : ''
    }
  ]
  constructor(private globalService:GlobalService, private commonService:CommonService, private fb : FormBuilder) { 
    this.searchForm = this.fb.group({
      searchInput : new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern(this._regex.NUMBER_ONLY),
        Validators.maxLength(10),
        Validators.minLength(10)
      ]))
    })
  }

  ngOnInit(): void {
  }
  onSelectEndPoint(obj:any){
    this.pnrData = null
    this.availableEndpoints = this.availableEndpoints?.map((c:any) =>{
      return {
        ...c,
        class : obj.id === c.id ? 'itemSelected' : ''
      }
    })
    this.selectedObject = this.availableEndpoints.find(x => x.id === obj.id)
  }
  getPnrData(){
    this.globalService.getPnrStatus(this.searchedValue).subscribe((res:any)=>{
      if(res.error !== "" )
        return this.commonService.openSnackBar(res.error, this._gc.SNACK_TOASTER_ERROR)
      this.pnrData = res.data || undefined
    })
  }
  getErrorMessage(fg:FormGroup, fc:string){
    return this.commonService.getFormFieldErrorMessage(fg,fc)
  }
}
