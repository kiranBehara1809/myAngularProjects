import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { GlobalConstants } from 'src/app/globals/GlobalConstants';
import { REGEX } from 'src/app/globals/REGEX';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  searchForm : FormGroup; 
  selectedObject:any=null;
  _gc = GlobalConstants;
  _regex = REGEX;
  weatherObject:any=null
  constructor(private fb : FormBuilder, private commonService : CommonService, private globalService : GlobalService) { 
    this.searchForm = this.fb.group({
      searchInput : new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern(this._regex.ALPHABETS_ONLY),
      ]))
    })
  }

  ngOnInit(): void {
  }
  getErrorMessage(fg:FormGroup, fc:string){
    return this.commonService.getFormFieldErrorMessage(fg,fc)
  }
  getWeatherData(){
    this.globalService.getWeatherInfo(this.searchForm.value.searchInput).subscribe(res=>{
      console.log(res)
      this.weatherObject = res || null
    })
  }
}
