import { ValidatorFn, AbstractControl } from '@angular/forms';

export function datePickerValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let forbidden = false;
    if (control.value) {
        var today = new Date();
        var birthDate = new Date(control.value);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        // var age1=24;
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age <= 18) {
            forbidden = true;
        }
    }
    return forbidden ? { 'invalidDOB': true } : null;
  };
} 

