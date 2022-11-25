import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { GlobalConstants } from 'src/app/globals/GlobalConstants';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-railway',
  templateUrl: './railway.component.html',
  styleUrls: ['./railway.component.scss']
})
export class RailwayComponent implements OnInit {
  selectedObject:any=null;
  searchedValue:string='6111772748';
  _gc = GlobalConstants;
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
  constructor(private globalService:GlobalService, private commonService:CommonService) { }

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
    if(!this.searchedValue){
      return this.commonService.openSnackBar("Enter PNR No",this._gc.SNACK_TOASTER_ERROR)
    }
    this.globalService.getPnrStatus(this.searchedValue).subscribe((res:any)=>{
      console.log(res)
      if(res.error !== "" )
        return this.commonService.openSnackBar(res.error, this._gc.SNACK_TOASTER_ERROR)
      this.pnrData = res.data || undefined
    })
  }
}
