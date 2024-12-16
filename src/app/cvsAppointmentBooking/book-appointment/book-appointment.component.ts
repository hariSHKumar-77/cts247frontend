import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesProvided } from 'src/app/model/services-provided.model';

import { AppointmentBookingService } from 'src/app/services/appointment-booking.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  
  servicesList!: ServicesProvided[] ;
  constructor(private route: Router, private userservices: AppointmentBookingService){

     this.userservices.getServicesList().subscribe((response: any)=>{

      console.log(response);
      console.log(typeof response.body);
      if(response.status == 200){
        this.servicesList = response.body;
      }
      else {
        this.servicesList = [];
      }
    }, 
    (error: any) => {
      this.servicesList = [];
    });
    // sessionStorage.setItem("servicesList", JSON.stringify(services));
    console.log(this.servicesList);
  }

  ngOnInit(): void {
  }

}
