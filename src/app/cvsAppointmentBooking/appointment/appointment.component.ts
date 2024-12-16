import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {

  slotDate: any;
  slotTime: any;
  doctorName: any;
  clinicAddress: any;
  service: any;
  patientName: any;
  constructor(private route: ActivatedRoute) {
    

    this.route.params.subscribe(params => {
      this.slotDate = params['slotDate'];
      this.slotTime = params['slotTime'];
      this.doctorName = params['doctorName'];
      this.clinicAddress = params['clinicAddress'];
      this.service = params['service'];
      this.patientName=sessionStorage.getItem('username');
    });
   }

  
  ngOnInit(): void {
  }
}
