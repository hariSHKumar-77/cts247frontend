import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgOtpInputModule } from 'ng-otp-input';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent {
  phNumber!: string;
  validationFailed: boolean = false;
  otpEntered = false;
  checkboxChecked = false;
  loginDisabled = true;
  otp: string | null = null;
  showOtpComponent = true;
  isOtpWrong =false;
  isOtpExpired=false;
  // @ViewChild("ngOtpInput", { static: false })
  // ngOtpInput: any;

  // config = {
  //   allowNumbersOnly: true, length: 6, isPasswordInput: false, disableAutoFocus: false, placeholder: "*", inputStyles: { width: "20px", height: "20px", },
  // };


  constructor(private route: ActivatedRoute, private userService:UserService,private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.phNumber = params['phNumber'];
    });

  }


  onCheckboxChange(event: any) {
    this.checkboxChecked = event.target.checked;
    this.checkLoginEnabled();
  }






  checkLoginEnabled() {
    if (this.otpEntered && this.checkboxChecked) {
      this.loginDisabled = false;
    } else {
      this.loginDisabled = true;
    }
  }


  onOtpChange(otp: string) {
    this.otp = otp;
    // alert(otp);
    if (otp.length == 6) {
      this.otpEntered=true;
     }
    else this.otpEntered=false;
    this.checkLoginEnabled();
  }
  

  // setVal(val: string) {
  //   this.ngOtpInput.setValue(val);
  // }

  // onConfigChange() {
  //   this.showOtpComponent = false;
  //   this.otp = null;
  //   setTimeout(() => { this.showOtpComponent = true; }, 0);
  // }

  // validateOtp() {
  //   // logic  to validate  
  // }



  onSubmit() {


    this.userService.login({ phNumber:this.phNumber,otp:this.otp }).subscribe((response: any) => {

      console.log(response);
      if (response.status == 200) {
        
        console.log(response.body);

        if(response.body.status!=null && response.body.status=='OTP expired')this.isOtpExpired=true;
        else if(response.body.status!=null && response.body.status=='Wrong OTP')this.isOtpWrong=true;    
        else {
          if(response.body.role!=null && response.body.role=='User'){
            if(response.body.newUser==true){
                this.router.navigate(['/registration'], { queryParams: { phNumber: this.phNumber } });
            }
            else{
              this.userService.loginSuccessful(response.body);
              this.router.navigate(['/']);
            }
          }
          if(response.body.role!=null && response.body.role=='Manager'){
            this.router.navigate(['/manager'], { queryParams: { phNumber: this.phNumber } });
          }
  
        }
        
      }

    });

   
  }



  resendOtp(){

  
    this.userService.generateOTP({ phNumber:this.phNumber }).subscribe((response: any) => {

      console.log(response);
      if (response.status == 200) {
        this.router.navigate(['/otp-verification'], { queryParams: { phNumber: this.phNumber } });

      }

    });

  }


}
