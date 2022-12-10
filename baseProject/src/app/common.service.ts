import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private dialog: MatDialog, private window: Window) { }

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

  getModalWidth(defaultWidth: string): string {
    let mobile = window.matchMedia("(max-width: 600px)");
    let tablet = window.matchMedia("(max-width: 900px)");
    return mobile.matches ? '100vw' : (tablet.matches ? '60vw' : defaultWidth)
  }

  closeDialogById(dialogId: string) {
    const dialog = this.dialog.getDialogById(dialogId)
    dialog?.close()
  }

  getBrowserDetails() {
    let nAgt = navigator.userAgent;
    let browserName = navigator.appName;
    let fullVersion = '' + parseFloat(navigator.appVersion);
    let majorVersion = parseInt(navigator.appVersion, 10);
    let nameOffset, verOffset, ix;
    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
      browserName = "Opera";
      fullVersion = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
      browserName = "Microsoft Internet Explorer";
      fullVersion = nAgt.substring(verOffset + 5);
    }
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
      browserName = "Chrome";
      fullVersion = nAgt.substring(verOffset + 7);
    }
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
      browserName = "Safari";
      fullVersion = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
      browserName = "Firefox";
      fullVersion = nAgt.substring(verOffset + 8);
    }
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
      (verOffset = nAgt.lastIndexOf('/'))) {
      browserName = nAgt.substring(nameOffset, verOffset);
      fullVersion = nAgt.substring(verOffset + 1);
      if (browserName.toLowerCase() == browserName.toUpperCase()) {
        browserName = navigator.appName;
      }
    }
    if ((ix = fullVersion.indexOf(";")) != -1)
      fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
      fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
      fullVersion = '' + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }
    return browserName + "~~" + fullVersion
  }

  getOsDetails() {
    let detectOS = "Unknown OS";
    if (navigator.appVersion.indexOf("Win") != -1)
      detectOS = "Windows";

    if (navigator.appVersion.indexOf("Mac") != -1)
      detectOS = "MacOS";

    if (navigator.appVersion.indexOf("Linux") != -1)
      detectOS = "Linux";


    return detectOS
  }
  getMobileOsDetails() {
    let window: any = this.window
    let mobileOs = 'unknown'
    let userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;

    if (/windows phone/i.test(userAgent)) {
      mobileOs = "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
      mobileOs = "Android";
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      mobileOs = "iOS";
    }
    return mobileOs
  }

  getSystemInformation() {
    let window: any = this.window
    const deviceRam = window.navigator.deviceMemory || null;
    const availableProcessors = window.navigator.hardwareConcurrency || null;
    const maxTouchPoints = window.navigator.maxTouchPoints || null;
    let os = this.getOsDetails();
    const browser = this.getBrowserDetails().split("~~")[0]
    const browserVersion = this.getBrowserDetails().split("~~")[1]
    const mobileOs = this.getMobileOsDetails()
    let isMobile = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) isMobile = true; })(navigator.userAgent || navigator.vendor || window.opera);
    if (isMobile) {
      os = mobileOs
    }
    let osLogo = 'unknown.png'
    if (os === "Windows")
      osLogo = "windows.png"
    if (os === "MacOS")
      osLogo = "mac.png"
    if (os === "Linux")
      osLogo = "linus.png"
    if (os === "Windows Phone")
      osLogo = "windowsmobile.png"
    if (os === "Android")
      osLogo = "android.png"
    if (os === "iOS")
      osLogo = "ios.png"
    let browserLogo = 'browser.png'
    if (browser === "Chrome")
      browserLogo = "chrome.png"
    if (browser === "Opera")
      browserLogo = "opera.png"
    if (browser === "Microsoft Internet Explorer")
      browserLogo = "ie.png"
    if (browser === "Safari")
      browserLogo = "safari.png"
    if (browser === "Firefox")
      browserLogo = "firefox.png"
    const obj = {
      deviceRam,
      availableProcessors,
      maxTouchPoints,
      os,
      browser,
      browserVersion,
      browserLogo,
      isMobile,
      osLogo
    }
    return obj
  }

  getBatteryDetails() {
    let window: any = this.window
    let battery = window.navigator.battery || window.navigator.webkitBattery || window.navigator.mozBattery;
    let promise = new Promise<any>((resolve, reject) => {
      if (window.navigator.getBattery) {
        window.navigator.getBattery().then((logBattery: any) => {
          resolve(logBattery)
        });
      } else if (battery) {
        resolve(battery)
      } else {
        reject(null)
      }
    })

    return promise
  }

  convertToCSV(objArray: any) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','

        line += array[i][index];
      }

      str += line + '\r\n';
    }

    return str;
  }
  getCurrentLocation(showDenied: boolean) {
    let window: any = this.window
    if (window.navigator.geolocation) {
      let geoLoc, watchID: any;
      let options = { timeout: 1200000 };
      geoLoc = window.navigator.geolocation;
      watchID = geoLoc.watchPosition((position: any) => {
        sessionStorage.setItem("LAT", position.coords.latitude)
        sessionStorage.setItem("LON", position.coords.longitude)
      }, (err: any) => {
        if (err.code == 1) {
          if (showDenied)
            this.openSnackBar("Access is denied! You can give access by checking the browser settings", this._gc.SNACK_TOASTER_WARN)
        } else if (err.code == 2) {
          this.openSnackBar("Position is unavailable!", this._gc.SNACK_TOASTER_WARN)
        }
      }, options);
    } else {
      this.openSnackBar("Sorry, browser does not support geolocation!", this._gc.SNACK_TOASTER_WARN);
    }
  }

}
