import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/model/doctor.model';
import { AppointmentBookingService } from 'src/app/services/appointment-booking.service';

interface Appointment {
  patient_Id: any;
  doctor_availability_Id: any;
  slotDate: any;
  slotTime: any;
}

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.css']
})
export class DoctorCardComponent implements OnInit {

  @Input() doctorDetails: Doctor;
  @Input() selectedDate!: string;

  slotAvailability: boolean[] = [];
  slotNames: string[] = ['10:30 AM', '11:30 AM', '12:30 PM', '03:00 PM', '04:00 PM', '5:00 PM'];
  slotValues: string[] = ['10:30:00', '11:30:00', '12:30:00', '15:00:00', '16:00:00', '17:00:00'];
  trackSlots: boolean[] = [false, false, false, false, false, false];

  selectedTimeslot!: string;

  enableConfirm: boolean = false;
  // slot1!: boolean;
  // slot2!: boolean;
  // slot3!: boolean;
  // slot4!: boolean;
  // slot5!: boolean;
  // slot6!: boolean;

  constructor(private appointmentBookingServices :AppointmentBookingService,private route:Router) {
    
  }

  ngOnInit(): void {
    console.log(this.doctorDetails, this.selectedDate);
    this.doctorDetails.timeSlots = this.doctorDetails.timeSlots.substring(1, (this.doctorDetails.timeSlots.length - 1));


    let timeSlots: string[] = this.doctorDetails.timeSlots.split(", ");


    for (let i = 0; i < timeSlots.length; i++) {
      this.slotAvailability.push(timeSlots[i] === "0" ? true : false);
    } 
  }

  selectTimeslot(index: any) {
    this.selectedTimeslot = this.slotValues[index];

    if (!this.trackSlots[index]) {
      this.trackSlots = [false, false, false, false, false, false];
      this.trackSlots[index] = true;

      this.enableConfirm = true;
    }
    else {
      this.trackSlots[index] = false;
      this.enableConfirm = false;
    }
  }

  bookAppointment() {

    var appointmentObject: Appointment = {
      patient_Id : 1,
      doctor_availability_Id : this.doctorDetails.doctorAvailabilityId,
      slotDate : this.selectedDate,
      slotTime : this.selectedTimeslot,
    };

    this.appointmentBookingServices.bookAppointment(appointmentObject).subscribe((response:any)=>{

      // console.log(response.body.slotTime);
      // /:slotDate/:slotTime/:clinicName/:clinicAddress/:service

      console.log(response.body);
      this.route.navigate(['BookAppointment/appointment/'+response.body.slotDate+"/"+response.body.slotTime+"/"+response.body.clinicAddress+"/"+response.body.service +'']);
    });


    console.log(appointmentObject);
  }

}
