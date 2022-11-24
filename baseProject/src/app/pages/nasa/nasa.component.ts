import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-nasa',
  templateUrl: './nasa.component.html',
  styleUrls: ['./nasa.component.scss']
})
export class NasaComponent implements OnInit {
  selectedCamera:any;
  nasaData:any=[];
  flipModel:string='';
  flipModelIndex:number=0;
  apiList = [
    {
      name : 'Mars Rover Photos',
      cameras : [
        {name : 'FHAZ', abbr : 'Front Hazard Avoidance Camera', class : ''},
        {name : 'RHAZ', abbr : 'Rear Hazard Avoidance Camera', class : ''},
        {name : 'MAST', abbr : 'Mast Camera', class : ''},
        {name : 'CHEMCAM', abbr : 'Chemistry and Camera Complex', class : ''},
        {name : 'MAHLI', abbr : 'MAHLI', class : ''},
        {name : 'MARDI', abbr : 'Mars Descent Imager', class : ''},
        {name : 'NAVCAM', abbr : 'NAVCAM', class : ''},
      ]
    }
  ]
  constructor(private globalService:GlobalService) { }

  ngOnInit(): void {
  }
  onClickCamera(cameraItem:any){
    this.apiList[0].cameras = this.apiList[0].cameras.map(cam =>{
        return {
          ...cam,
          class : cameraItem.name === cam.name ? 'itemSelected' : ''
        }
    })
    this.selectedCamera = cameraItem
    this.globalService.getNasaData(cameraItem.name).subscribe((data:any)=>{
      this.nasaData = data?.photos || []
      console.log(this.nasaData)
    })
  }
}
