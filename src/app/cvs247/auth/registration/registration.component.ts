import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  isMale: boolean = false;
  isFemale: boolean = false;
  isFormComplete: boolean = false;
  registrationForm!: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {


  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: [''],
      dateOfBirth: ['', [Validators.required]],
      phNumber: ['',],
      email: ['', [Validators.email, Validators.required]],
      gender: [, [Validators.required]],
      imageUrl: ["https://firebasestorage.googleapis.com/v0/b/cts247-7a4ae.appspot.com/o/images%2Fuser.png?alt=media&token=ebf13033-f03a-4b26-a62d-a03ae510b6ec"]
    });




    this.route.queryParams.subscribe(params => {
      this.registrationForm.controls['phNumber'].setValue(params['phNumber']);
    });
  }

  onMaleClick(): void {
    if (this.registrationForm.controls['gender'].value == 'MALE') this.registrationForm.controls['gender'].setValue(null);
    else this.registrationForm.controls['gender'].setValue('MALE');



    //  console.log(this.registrationForm.value.gender);
  }

  onFemaleClick(): void {
    if (this.registrationForm.controls['gender'].value == 'FEMALE') this.registrationForm.controls['gender'].setValue(null);
    else this.registrationForm.controls['gender'].setValue('FEMALE');

    // console.log(this.registrationForm.value.gender);
  }

  dateTransform() {
    var dob_ddmmyyy = this.registrationForm.get('dateOfBirth')?.value.split("-");
    this.registrationForm.controls['dateOfBirth'].setValue(dob_ddmmyyy[1] + "/" + dob_ddmmyyy[2] + "/" + dob_ddmmyyy[0]);
  }




  submitForm(): void {
    // Handle form submission
    this.dateTransform();

    console.log(this.registrationForm.value);

    this.userService.register(this.registrationForm.value).subscribe((response: any) => {

      console.log(response.body);
      if (response.status == 201) {
        this.userService.loginSuccessful(response.body);
        this.router.navigate(['/']);

      }

    });
  }
}
