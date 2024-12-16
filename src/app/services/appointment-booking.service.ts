import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import endpointData from "../../assets/configuration/config.json";

@Injectable({
  providedIn: 'root'
})
export class AppointmentBookingService {

  constructor(private route: Router,
    private http: HttpClient) { }

    getServicesList(){
      console.log("from get serfvices");
      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      return this.http.get(endpointData.cvs247BackendServiceAPI + endpointData.getAllServicesURI,
            { headers, responseType: 'json', observe: 'response' });
  }
  getDoctorsList(requestDoctors:any){
      console.log("reached fetch all doctors ", requestDoctors);
      // let token: any = sessionStorage.getItem('token');
      let token: string="garbage";

      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });

      // const params = new HttpParams().set('ServiceId',serviceId );

      return this.http.post(endpointData.cvs247BackendServiceAPI + endpointData.getAllDoctorsURI, requestDoctors,
        { 'headers': headers, responseType: 'json' ,observe: 'response' });
  }

  bookAppointment(appointmentDetails: any) {
    // let token: any = sessionStorage.getItem('token');
    console.log(appointmentDetails);
    let token: any = "garbage";

        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });

        return this.http.post(endpointData.cvs247BackendServiceAPI + endpointData.bookAppointmentURI,appointmentDetails,
            { responseType: 'json' ,observe: 'response' });
  }
}
