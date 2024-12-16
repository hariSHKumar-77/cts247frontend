import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { Address } from 'src/app/model/address.model';
import { UserService } from 'src/app/services/user.service';
import { AddressService } from '../services/address.sevice';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  
  addressForm: NgForm;
  address: Address=new Address();
  
  btnStatus={houseNo:true,streetName:true,city:true,district:true,state:true,pincode:true,id:true};


  constructor(private userservice : UserService) { }

  ngOnInit(): void {
   
    this.userservice.getAddress().subscribe((response: any) => {

      if(response.status==200){
        
        this.address=response.body;
        
        
        
      }

  })
};

onClick(field:string) {
  if (this.btnStatus[field]) {
    this.btnStatus[field] = !this.btnStatus[field];
  } else {
    this.btnStatus[field] = !this.btnStatus[field];
    // console.log(this.piForm.value);
    // console.log(this.personalInfo);
    // this.userService.generateOTP(this.personalInfo.phNumber);
    this.userservice.updateAddress(this.address).subscribe((response:any)=>{
      if(response.status==202){
        console.log(response.body);
        
      }
    });
    // this.personalInfoService.editInfo(id, this.piForm.value);
  }
}
 

}
