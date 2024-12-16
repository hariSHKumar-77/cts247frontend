import { AbstractControl, FormGroup } from "@angular/forms";

export function PasswordMatch(password:string,reenterPassword:string)
{
return (formGroup:FormGroup)=>
{
    const passwordValue=formGroup.controls[password];
    const reEnterpasswordValue=formGroup.controls[reenterPassword];

     
      if(passwordValue.value!==reEnterpasswordValue.value)
      {
        reEnterpasswordValue.setErrors({PasswordMatch:true});
      }
      else
      {
        reEnterpasswordValue.setErrors(null);

      }




    
}
}