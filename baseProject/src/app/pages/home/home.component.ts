import { DatePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { GlobalConstants } from 'src/app/globals/GlobalConstants';
import { WEATHER } from 'src/app/globals/interfaces';
import { REGEX } from 'src/app/globals/REGEX';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './compass.scss']
})
export class HomeComponent implements OnInit {
  zipCodeForm: FormGroup;
  _regex = REGEX;
  _gc = GlobalConstants;
  // weatherObject:WEATHER | undefined;
  weatherObject = {} as WEATHER;
  locationBlocked = false;
  pinCodeData: any = null;
  cityName: any = undefined;
  areaName: any = undefined;
  randomActivity: string = "Oops ...! Random activity API not working"
  constructor(private fb: FormBuilder, private commonService: CommonService, private globalService: GlobalService, private window: Window, private datePipe: DatePipe) {
    this.zipCodeForm = this.fb.group({
      pinCode: new FormControl(null, Validators.compose([Validators.pattern(this._regex.NUMBER_ONLY), Validators.required, Validators.maxLength(6), Validators.minLength(6)]))
    })
  }

  ngOnInit(): void {
    this.getRandomActivities()
    this.getSunriseAndSunset()
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
  copy(toCopyString: string) {
    window.navigator.clipboard.writeText(toCopyString);
    this.commonService.openSnackBar("Copied", this._gc.SNACK_TOASTER_INFO)
  }
  getSunriseAndSunset() {
    let lat = sessionStorage.getItem("LAT");
    let lon = sessionStorage.getItem("LON");
    if (lat == null || lon == null) {
      this.commonService.getCurrentLocation(true);
      return
    }
    this.getWeatherInfo()
    this.globalService.commonGet(`https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}&timezone=UTC&date=${this.datePipe.transform(new Date(), 'yyyy-MM-dd')}`).subscribe((data: any) => {
      if (data) {
        console.log(data?.results?.sunrise?.split(":"))
        let utcSunrise = data?.results?.sunrise?.split(":")
        let utcSunset = data?.results?.sunset?.split(":")
        let sunrise = this.commonService.getSunriseAndSunsetTime(utcSunrise[0], utcSunrise[1], 0, 'AM')
        let sunset = this.commonService.getSunriseAndSunsetTime(utcSunset[0], utcSunset[1], 0, 'PM')
        this.weatherObject['sunrise'] = sunrise
        this.weatherObject['sunset'] = sunset
      }
    }, err => {
      console.log("ERROR in sunrise and sunset Api = > ", err);
    })
  }
  getWeatherInfo() {
    let window: any = this.window

    window.navigator.permissions.query({ name: 'geolocation' }).then((result: any) => {
      if (result.state === "prompt") {
        this.commonService.getCurrentLocation(false)
      } else if (result.state === "granted") {

      } else {
        this.locationBlocked = true
      }
    }).catch((e: any) => {
      alert(e)
    });
    let lat: any = sessionStorage.getItem("LAT");
    let lon: any = sessionStorage.getItem("LON");
    if (lat === null || lon === null) {
      this.commonService.getCurrentLocation(true);
      return
    }
    this.globalService.getWeatherInfo(this.cityName, lat, lon).subscribe((data: any) => {
      if (data) {
        this.areaName = data.name
        // this.cityName = data.name
        this.weatherObject['area'] = data.name
        this.weatherObject['temp_max'] = data?.main?.temp_max
        this.weatherObject['temp_min'] = data?.main?.temp_min
        this.weatherObject['pressure'] = data?.main?.pressure
        this.weatherObject['feels_like'] = data?.main?.feels_like
        this.weatherObject['temp'] = data?.main?.temp
        this.weatherObject['humidity'] = data?.main?.humidity
        this.weatherObject['visibility'] = data?.visibility
        this.weatherObject['windSpeed'] = data?.wind?.speed
        this.weatherObject['windDeg'] = data?.wind?.deg
        this.weatherObject['spinnerValue'] = data?.main?.pressure - 950
        if (data?.main?.pressure > 1050 || data?.main?.pressure < 950) {
          this.weatherObject['spinnerValue'] = data?.main?.pressure > 1050 ? 100 : (data?.main?.pressure < 950 ? 0 : 0)
        }
        let root = document.documentElement;
        root.style.setProperty('--windDeg', `${this.weatherObject['windDeg']}deg`)
      } else {
        this.commonService.openSnackBar("API is not working");
      }
    }, err => {
      console.error("UNABLE TO GET WEATHER INFO ===>   " + err);
    });
  }
  openWeatherMap(url:any){
    this.window.open(url)
  }
}
