import { DatePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';
import { GlobalConstants } from 'src/app/globals/GlobalConstants';
import { MAT_DIALOG_HEADER, WEATHER } from 'src/app/globals/interfaces';
import { REGEX } from 'src/app/globals/REGEX';
import { GlobalService } from 'src/app/services/global.service';
import { sha256, sha224 } from 'js-sha256';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { v4 as uuidv4 } from 'uuid';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './compass.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('covidPopup') covidPopup!: TemplateRef<any>;
  @ViewChild('borders') borders!: TemplateRef<any>;
  @ViewChild('languages') languages!: TemplateRef<any>;
  matDialogHeader: MAT_DIALOG_HEADER | undefined
  zipCodeForm: FormGroup;
  currencyConverterForm: FormGroup;
  covidForm: FormGroup;
  _regex = REGEX;
  _gc = GlobalConstants;
  txnId:any=null;
  token:any=null;
  weatherObject = {} as WEATHER;
  locationBlocked = false;
  pinCodeData: any = null;
  cityName: any = undefined;
  areaName: any = undefined;
  sendOtpText: any = "Send OTP";
  pdfData:any=null;
  waitingForOtp=false
  interval: any;
  countryCurrencies: any[] = []
  countires: any[] = []
  borderNames: any[] = []
  countryObject:any=null;
  randomActivity: string = "Oops ...! Random activity API not working"
  constructor(private fb: FormBuilder, private commonService: CommonService, private globalService: GlobalService, private window: Window, private datePipe: DatePipe, private dialog: MatDialog,private bottomSheet: MatBottomSheet) {
    this.zipCodeForm = this.fb.group({
      pinCode: new FormControl(null, Validators.compose([Validators.pattern(this._regex.NUMBER_ONLY), Validators.required, Validators.maxLength(6), Validators.minLength(6)]))
    })
    this.currencyConverterForm = this.fb.group({
      fromCountry: new FormControl(null, Validators.compose([Validators.required])),
      toCountry: new FormControl(null, Validators.compose([Validators.required])),
      amount: new FormControl(null, Validators.compose([Validators.pattern(this._regex.NUMBER_ONLY), Validators.required, Validators.maxLength(6)])),
      convertedAmount: new FormControl({ value: null, disabled: true })
    })
    this.covidForm = this.fb.group({
      mobileNumber: new FormControl(null, Validators.compose([Validators.pattern(this._regex.NUMBER_ONLY), Validators.required, Validators.maxLength(10),Validators.minLength(10)])),
      otp: new FormControl(null, Validators.compose([ Validators.maxLength(6), Validators.minLength(6)])),
      beneficiary_reference_id: new FormControl(null, Validators.compose([Validators.pattern(this._regex.NUMBER_ONLY),  Validators.maxLength(24)])),
    })
  }

  ngOnInit(): void {
    this.getRandomActivities()
    this.getSunriseAndSunset()
    this.getCountriesAndCurrencies()
    this.getCountries()
    this.commonService.getPlaceTime()
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
    // window.open(`https://maps.google.com/?q=${data?.latitude},${data.longitude}`)
    window.open(`https://maps.google.com/?q=${data?.placename},${data.state}`)
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
  openWeatherMap(url: any) {
    this.window.open(url)
  }

  getCountriesAndCurrencies() {
    this.globalService.commonGet(`https://restcountries.com/v2/all?fields=name,capital,currencies`).subscribe((data: any) => {
      if (data) {
        this.countryCurrencies = data || []
      }
    })
  }

  convert() {

    const fromCountry = this.currencyConverterForm.value.fromCountry
    const toCountry = this.currencyConverterForm.value.toCountry
    const amount = this.currencyConverterForm.value.amount
    if (fromCountry === toCountry) {
      this.commonService.openSnackBar("From country and to country can\'t be same")
      return
    }
    const url = `https://v6.exchangerate-api.com/v6/41f84a67c4fcaedb8495ea5b/pair/${fromCountry}/${toCountry}/${amount}`
    this.globalService.commonGet(url).subscribe((data: any) => {
      if (data) {
        this.currencyConverterForm.patchValue({
          convertedAmount: data?.conversion_result || 0
        })
      } else {
        this.commonService.openSnackBar("Something went wrong", this._gc.SNACK_TOASTER_ERROR)
      }
    }, err => {
      this.commonService.openSnackBar("ERROR with API", this._gc.SNACK_TOASTER_ERROR)
    })
  }
  reverse() {
    const formValue = this.currencyConverterForm.value
    this.currencyConverterForm.patchValue({
      fromCountry: formValue.toCountry,
      toCountry: formValue.fromCountry
    })
    this.convert()
  }

  openCovidPopup() {
    // this.dialog.open(this.covidPopup)
    this.matDialogHeader = {
      header: 'Vaccination Certificate',
      hideIcons: false,
      id: 'covidPopup',
      enableOnlyClose: true
    }
    let mobile = window.matchMedia("(max-width: 600px)")
    let tablet = window.matchMedia("(max-width: 900px)")
    const covidModal = this.dialog.open(this.covidPopup, {
      ...this._gc.macintoshModal,
      id: 'covidPopup',
      width: mobile.matches ? '100vw' : (tablet.matches ? '60vw' : '30vw'),
    })
    covidModal.afterClosed().subscribe(res => {
      this.matDialogHeader = undefined
      clearInterval(this.interval);
      this.sendOtpText = "Send OTP"
      this.waitingForOtp = false
      this.covidForm.reset()
      this.txnId = null;
      this.token = null;
    })
  }
  sendOtp(countdownTimer) {
    if (this.waitingForOtp)
        return
      
    this.startTimer(countdownTimer)
    const payload = {
      mobile : this.covidForm.value.mobileNumber
    }
    this.globalService.commonPost(`https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,payload).subscribe((data:any)=>{
      this.txnId = data?.txnId
      this.commonService.openSnackBar(`OTP Sent`, this._gc.SNACK_TOASTER_SUCCESS )
    }, err=>{
      this.commonService.openSnackBar(`${err.error}`, this._gc.SNACK_TOASTER_ERROR )
    })
  }
  startTimer(countDownTime) {
    const futureDate = new Date();
    futureDate.setMinutes(futureDate.getMinutes() + countDownTime);
    const futureTime = futureDate.getTime()
    this.interval = setInterval(() => {
      const currentTime = new Date().getTime()
      let minuteDiff = futureTime - currentTime;
      let minutes:any = Math.floor((minuteDiff % (1000 * 60 * 60)) / (1000 * 60));
      let seconds:any = Math.floor((minuteDiff % (1000 * 60)) / 1000);
      minutes = minutes.toString().padStart(2, '0');
      seconds = seconds.toString().padStart(2, '0');
      this.sendOtpText = `Resend in ${minutes}:${seconds}`
      this.waitingForOtp = true
      if (minuteDiff < 0) {
        clearInterval(this.interval);
        this.waitingForOtp = false
        this.sendOtpText = "Resend OTP"
        this.txnId = null
        this.token = null
      }
    }, 1000);
  }
  confirmOtp(){
    const payload = {
      otp : sha256(this.covidForm.value.otp),
      txnId : this.txnId
    }
    this.globalService.commonPost(`https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP`,payload).subscribe((data:any)=>{
      if(data){
        this.token = data?.token
        this.commonService.openSnackBar(`OTP verified, enter Beneficiary Reference Id`, this._gc.SNACK_TOASTER_SUCCESS )
      }
    },err=>{
      this.commonService.openSnackBar(`${err.error.error || err.error}`, this._gc.SNACK_TOASTER_ERROR )
    })
  }
  downloadVaccination(){
    const url = `https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=${this.covidForm.value.beneficiary_reference_id}`;
    this.globalService.covidCertificateDownload(url, this.token).subscribe((data:any)=>{
      this.arrayBufferToBase64(data, 'pdf', 'covid_vaccination_certificate')
    }, err=>{
      this.commonService.openSnackBar(`${err.error.error || err.error}`, this._gc.SNACK_TOASTER_ERROR )
    })
  }

  arrayBufferToBase64(Arraybuffer, Filetype, fileName) {
    let binary = '';
    const bytes = new Uint8Array(Arraybuffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const file = window.btoa(binary);
    const mimType = Filetype === 'pdf' ? 'application/pdf' : Filetype === 'xlsx' ? 'application/xlsx' :
      Filetype === 'pptx' ? 'application/pptx' : Filetype === 'csv' ? 'application/csv' : Filetype === 'docx' ? 'application/docx' :
        Filetype === 'jpg' ? 'application/jpg' : Filetype === 'png' ? 'application/png' : '';
    const url = `data:${mimType};base64,` + file;

    // url for the file
    // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    // download the file
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      this.commonService.openSnackBar(`Covid Vaccination Certificate downloaded successfully.`, this._gc.SNACK_TOASTER_SUCCESS )
      const dialog = this.dialog.getDialogById('covidPopup')
      dialog?.close()
  }
  getCountries(){
    this.globalService.commonGet(`https://restcountries.com/v2/all`).subscribe((data:any) =>{
      this.countires = data?.map(rec=>{
        return {
          ...rec,
          uuid : uuidv4()
        }
      }) || []
    },err=>{
      this.commonService.openSnackBar("Error while fetching Countries", this._gc.SNACK_TOASTER_ERROR)
    })
  }
  onSelectCountry(event:MatSelectChange){
    const selectedCountry = event.value
    const countryObject = this.countires?.find((x:any)=> x.uuid === selectedCountry)
    this.countryObject = countryObject || null
  }
  getBorders(countries:string[]){
    let borderCountryNames = countries?.map(alpha3Code =>{
      return  this.countires?.find((x:any)=> x.alpha3Code === alpha3Code)?.name
    })
    let str =  borderCountryNames?.join() || ''
    if(str.length > 16){
      str = str.substr(0,16)+"..."
    }
    return str
  }
  getLanguages(languages:any[]){
    let lanuages = languages?.map(rec => {
      return rec.name
    })
    let str =  lanuages?.join() || ''
    if(str.length > 16){
      str = str.substr(0,16)+"..."
    }
    return str
  }
  showBorders(borderCountryNames:string[]){
    let bcN = borderCountryNames?.map(alpha3Code =>{
      return  this.countires?.find((x:any)=> x.alpha3Code === alpha3Code)
    })
    this.borderNames = bcN || []
    this.bottomSheet.open(this.borders)
  }
}
