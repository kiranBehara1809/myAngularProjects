import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbaComponent } from './commonComponents/snackba/snackba.component';
import { GlobalConstants } from './globals/GlobalConstants';
import { REGEX } from './globals/REGEX';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  _gc = GlobalConstants
  _regex = REGEX
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  getFormFieldErrorMessage(formGroup: FormGroup, formControlName: string): string {
    let errorMsg = ''
    if (formGroup === null || formGroup === undefined || formGroup.controls === undefined || formGroup.controls === null || formControlName === undefined || formGroup.controls[formControlName] === undefined || formGroup.controls[formControlName] === null) {
      return ''
    }
    if (formGroup.controls[formControlName].hasError('required')) {
      errorMsg = "This Field is mandatory"
    }
    if (formGroup.controls[formControlName].hasError('pattern')) {
      const pattern = (formGroup.controls[formControlName].errors?.['pattern'].requiredPattern);
      const regexObject = this._regex.ALL_REGEXP.find(regExp => (String(regExp.REG_EXP) === String(pattern)))
      errorMsg = `Invalid - ${regexObject?.ERROR_MSG}`
    }
    if (formGroup.controls[formControlName].hasError('email')) {
      errorMsg = "Email is Invalid"
    }
    if (formGroup.controls[formControlName].hasError('maxlength')) {
      const requiredLength = (formGroup?.controls?.[formControlName]?.errors?.['maxlength'].requiredLength);
      errorMsg = `Max length (${requiredLength}) exceeded.`
    }
    if (formGroup.controls[formControlName].hasError('minlength')) {
      const requiredLength = (formGroup?.controls?.[formControlName]?.errors?.['minlength'].requiredLength);
      errorMsg = `Minimum length is (${requiredLength}).`
    }
    if (formGroup.controls[formControlName].hasError('max')) {
      const requiredLength = (formGroup?.controls?.[formControlName]?.errors?.['max'].max);
      errorMsg = `Max (${requiredLength}) value exceeded.`
    }
    if (formGroup.controls[formControlName].hasError('min')) {
      const requiredLength = (formGroup?.controls?.[formControlName]?.errors?.['min'].min);
      errorMsg = `Minimum value is (${requiredLength}).`
    }
    return errorMsg
  }

  getWeatherData() {
    const API = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=da931ad4502df1d216edb321e2af6ecc`
    return this.http.get(`${API}`)
  }

  openSnackBar(message: string, className?: string, duration?: number, action?: string) {
    this._snackBar.openFromComponent(SnackbaComponent, {
      ...this._gc.SNACK_TOASTER_CONFIG,
      duration: duration || this._gc.DEAFULT_SNACK_TOASTER_TIMER,
      panelClass: className || this._gc.DEFAULT_SNACK_TOASTER_CLASS,
      data: {
        message: message || this._gc.NMD,
        action: 'close',
        className: className || this._gc.DEFAULT_SNACK_TOASTER_CLASS
      }
    })
  }

  showMessage(apiResponse: any): boolean {
    let returnFlag: boolean = false
    if (apiResponse.status === 500 || apiResponse.status === 404) {
      this.openSnackBar(apiResponse.msg, this._gc.SNACK_TOASTER_ERROR)
      returnFlag = true
    }
    if (apiResponse.status === 200) {
      this.openSnackBar(apiResponse.msg, this._gc.SNACK_TOASTER_SUCCESS)
      returnFlag = false
    }
    return returnFlag
  }

  requestAndShowPermission(title: string, body: string) {
    const permission = Notification.permission
    if (permission === "granted") {
      let sampleNotification = new Notification(title, { body })
    } else if (permission === 'denied') { 
        this.openSnackBar('Notifications are denied/blocked, please enable them to proceed', this._gc.SNACK_TOASTER_INFO)
     } else {
      Notification.requestPermission(permission => {
        if (permission === "granted") {
          let sampleNotification = new Notification(title, { body })
        }
      });
    }
  }

  getModalWidth(defaultWidth:string):string{
    let mobile = window.matchMedia("(max-width: 600px)");
    let tablet = window.matchMedia("(max-width: 900px)");
    return mobile.matches ? '100vw' : (tablet.matches ? '60vw' : defaultWidth)
  }

}
