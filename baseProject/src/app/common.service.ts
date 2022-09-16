import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  getFormFieldErrorMessage(formGroup: FormGroup, formControlName: string): string {
    let errorMsg = ''
    if (formGroup === null || formGroup === undefined ||  formGroup.controls === undefined ||  formGroup.controls === null ||formControlName === undefined || formGroup.controls[formControlName] === undefined || formGroup.controls[formControlName] === null) {
      return ''
    }
    if (formGroup.controls[formControlName].hasError('required')) {
      errorMsg = "This Field is mandatory"
    }
    // if (formGroup.controls[formControlName].hasError('pattern')) {
    //   const pattern = (formGroup.controls[formControlName].errors['pattern'].requiredPattern);
    //   const regexObject = this.regex.ALL_REGEXP.find(regExp => (String(regExp.REG_EXP) === String(pattern)))
    //   errorMsg = `Invalid - ${regexObject?.ERROR_MSG}`
    // }
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

}
