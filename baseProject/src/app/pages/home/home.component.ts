import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { GlobalConstants } from 'src/app/globals/GlobalConstants';
import { REGEX } from 'src/app/globals/REGEX';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  zipCodeForm: FormGroup;
  _regex = REGEX;
  _gc = GlobalConstants;
  pinCodeData: any = null;
  randomActivity: string = "Oops ...! Random activity API not working"
  constructor(private fb: FormBuilder, private commonService: CommonService, private globalService: GlobalService, private window: Window) {
    this.zipCodeForm = this.fb.group({
      pinCode: new FormControl(null, Validators.compose([Validators.pattern(this._regex.NUMBER_ONLY), Validators.required, Validators.maxLength(6), Validators.minLength(6)]))
    })
  }

  ngOnInit(): void {
    this.getRandomActivities()
  }
  getFormFieldError(fg: FormGroup, fc: string) {
    return this.commonService.getFormFieldErrorMessage(fg, fc)
  }
  searchPinCodeData() {
    this.globalService.commonGet(`https://api.zippopotam.us/in/${this.zipCodeForm.value.pinCode}`).subscribe((data: any) => {
      if (data) {
        let newObject: any = {}
        for (const key in data) {
          newObject[`${key.replace(/ +/g, "")}`] = data[key];
        }
        let newInnerArray: any = []
        newObject['places'].map((rec: any, index: number) => {
          let newInnerObj: any = {}
          for (const innerKey in newObject['places'][index]) {
            newInnerObj[`${innerKey.replace(/ +/g, "")}`] = newObject['places'][index][innerKey];
          }
          newInnerArray.push(newInnerObj)
        })
        newObject['places'] = newInnerArray
        this.pinCodeData = newObject || null
      }
    }, err => {
      this.commonService.openSnackBar("Error while fetching Pincode Data", this._gc.SNACK_TOASTER_ERROR)
    })
  }
  openInMaps(data: any) {
    window.open(`https://maps.google.com/?q=${data?.latitude},${data.longitude}`)
  }
  copyData(data: any) {
    let window: any = this.window;
    const obj = {
      Place: data?.placename,
      State: data?.state,
      Country: this.pinCodeData?.country,
      PostalCode: this.pinCodeData?.postcode
    }
    window.navigator.clipboard.writeText(this.commonService.convertToCSV([obj]));
    this.commonService.openSnackBar("Copied", this._gc.SNACK_TOASTER_INFO)
  }
  getRandomActivities() {
    setInterval(() => {
      this.globalService.commonGet(`https://www.boredapi.com/api/activity`).subscribe((data: any) => {
        if (data) {
          this.randomActivity = data.activity
        }
      })
    }, 5000)
  }
  copy(toCopyString:string) {
    window.navigator.clipboard.writeText(toCopyString);
    this.commonService.openSnackBar("Copied", this._gc.SNACK_TOASTER_INFO)
  }
  getSunriseAndSunset(){
    let lat = sessionStorage.getItem("LAT");
    let lon = sessionStorage.getItem("LON");
    if(lat == null || lon == null){
      this.commonService.getCurrentLocation(true);
    }
    this.globalService.commonGet(`https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873&timezone=UTC&date=today`).subscribe(data =>{
      if(data){

      }
    }, err => {
      console.log("ERROR in sunrise and sunset Api = > " , err);
    })
  }
}
