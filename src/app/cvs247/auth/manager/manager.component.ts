import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
  usernameControl = new FormControl('', [Validators.required]);
  
  passwordControl = new FormControl('', [Validators.required]);
  get usernameControlInvalid() {
    return this.usernameControl.invalid && (this.usernameControl.dirty || this.usernameControl.touched);
  }
  get passwordControlInvalid() {
    return this.passwordControl.invalid && (this.passwordControl.dirty || this.passwordControl.touched);
  }

onSubmit(){

}
}
