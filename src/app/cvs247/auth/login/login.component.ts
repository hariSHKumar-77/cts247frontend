import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mobileNumber: string = '';

  constructor(private router: Router, private userService: UserService) { }

  mobileNumberControl = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ]);

  get mobileNumberControlInvalid() {
    return this.mobileNumberControl.invalid && (this.mobileNumberControl.dirty || this.mobileNumberControl.touched);
  }
  onSubmit() {

    const phNumber = this.mobileNumberControl.value!;

    if (phNumber.length !== 13) {
      // If the mobile number is not valid, show an error message
      this.mobileNumberControl.setErrors({ invalid: true });
      return;
    }

    this.userService.generateOTP({ phNumber }).subscribe((response: any) => {

      console.log(response);
      if (response.status == 200) {
        this.router.navigate(['/otp-verification'], { queryParams: { phNumber: phNumber } });

      }

    });

    // Navigate to the OTP verification page, passing the mobile number as a query parameter


  }


}
