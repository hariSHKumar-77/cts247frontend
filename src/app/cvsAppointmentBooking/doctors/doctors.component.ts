import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/model/doctor.model';
import { AppointmentBookingService } from 'src/app/services/appointment-booking.service';

interface DoctorsRequest {
  serviceId: any;
  date: any;
}

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  serviceId!: string;

  doctorsList!: Doctor[];

  today = new Date();

  selectedDate!: any;

  datesList: Date[] = [];
  trackDates: boolean[] = [false, true, false, false, false, false, false];
  dayName: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  monthName: string[] = ['', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEPT', 'OCT', 'NOV', 'DEC'];


  constructor(private route: ActivatedRoute,
    private http : HttpClient,
    private routeNavigate:Router,
    private appointmentbookingservices: AppointmentBookingService,
    private datepipe: DatePipe) {

    this.route.params.subscribe(params => {
      this.serviceId = params['serviceId'];
    });

    for(let i=0;i<7;i++) {
      this.datesList.push(new Date());
      this.datesList[i].setDate(this.datesList[i].getDate() + i);
    }
    
    this.selectedDate = this.datepipe.transform(this.datesList[0], 'MM/dd/yyyy');

    var requestDoctors: DoctorsRequest = {
      serviceId: Number( this.serviceId),
      date: this.selectedDate
    };

    // if(!this.authservices.isLoggedIn()){
    //   this.routeNavigate.navigate(['/login']);
    // }

      console.log(requestDoctors, this.selectedDate);

      this.appointmentbookingservices.getDoctorsList(requestDoctors).subscribe((response: any)=>{
       console.log(response.body); 
      if(response.status == 200){
        this.doctorsList = response.body;
      }
      else {
        this.doctorsList = [];
      }
    }, 
    (error: any) => {
      console.log(error);
      this.doctorsList = [];
    });
    // this.doctorsList = clinics;
  }

  ngOnInit(): void {
    
  }

  selectDate(index: any){
    if(!this.trackDates[index] && (this.datesList[index].getDay() != 0))
    {
      this.trackDates = [false, false, false, false, false, false, false];
      this.trackDates[index] = true;
      this.selectedDate = this.datepipe.transform(this.datesList[index], 'MM/dd/yyyy');

    var requestClinics: DoctorsRequest = {
      serviceId: Number(this.serviceId),
      date: this.selectedDate
    };

    // if(!this.authservices.isLoggedIn()){
    //   this.routeNavigate.navigate(['/login']);
    // }
    
      this.appointmentbookingservices.getDoctorsList(requestClinics).subscribe((response: any)=>{
    
      if(response.status == 200){
        this.doctorsList = response.body;
      }
      else {
        this.doctorsList = [];
      }
    }, 
    (error: any) => {
      this.doctorsList = [];
    });

      // this.doctorsList = doctors;
    }
    console.log(this.doctorsList);
  }

  orderByAsc(){

  }

  orderByDesc(){

  }

}
