import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import configJson from "../../assets/configuration/config.json";
import { Address } from '../model/address.model';
import { PersonalInfo } from '../model/personalInfo.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private route: Router,
    private httpClient: HttpClient,
    ) { }
    
  currentUser = { name: 'John Doe', email: 'john.doe@example.com' };

  // login(mobileNumber: string, otp: string): Observable<any> {
  //   return of(this.currentUser);
  // }

  isLoggedIn(): boolean {
    const user = sessionStorage.getItem("userId");
    if (user != null) {
        return true
    }
    return false;
  }

  getUserId(){
    return sessionStorage.getItem("userId");
  }
  
  generateOTP(phnumber:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(configJson.cvs247BackendServiceAPI+configJson.generateOTPAPI,phnumber,
      {headers,responseType:'text',observe:'response'});

    
  }

  logout(){
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("firstname");
    sessionStorage.removeItem("lastname");
    sessionStorage.removeItem("phNumber");
    sessionStorage.removeItem("imageUrl");
  }

  login(loginData:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(configJson.cvs247BackendServiceAPI+configJson.loginAPI,loginData,
      {headers,responseType:'json',observe:'response'});
 
  }


  loginSuccessful(user: any) {
    console.log(user);
    sessionStorage.setItem("userId", user.userId);
    sessionStorage.setItem("firstname", user.firstname);
    sessionStorage.setItem("lastname", user.lastname);
    sessionStorage.setItem("phNumber", user.phNumber);
    sessionStorage.setItem("imageUrl", user.imageUrl);
    console.log(sessionStorage.getItem("firstname"));
  }

  updateFirstname(firstname:any){
    sessionStorage.setItem("firstname", firstname);
  }

  updateProfileImage(imageUrl:any){
    sessionStorage.setItem("imageUrl", imageUrl);
  }
  
  updateLastname(lastname:any){
    sessionStorage.setItem("lastname", lastname);

  }
  register(registerData:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(configJson.cvs247BackendServiceAPI+configJson.registerAPI,registerData,
      {headers,responseType:'json',observe:'response'});
 
  }

  getUserDetails(){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const phNumber=sessionStorage.getItem("phNumber");
    return this.httpClient.get(configJson.cvs247BackendServiceAPI+configJson.userDetailsAPI+"/"+phNumber,
      {headers,responseType:'json',observe:'response'});
 
  }


  getAddress(){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const userId=sessionStorage.getItem("userId");
    return this.httpClient.get(configJson.cvs247BackendServiceAPI+configJson.userAddressAPI+"/"+userId,
      {headers,responseType:'json',observe:'response'});
 
  }
  
  
  getProducts(){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const userId=sessionStorage.getItem("userId");
    return this.httpClient.get(configJson.cvs247BackendServiceAPI+configJson.getProductsAPI,
      {headers,responseType:'json',observe:'response'});
 
  }

  updateUserDetails(personalInfo:PersonalInfo){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const userId=sessionStorage.getItem("userId");
    console.log(personalInfo);
    console.log(userId);
    console.log(configJson.cvs247BackendServiceAPI+configJson.updateDetailsAPI+"/"+userId);
    let url=configJson.cvs247BackendServiceAPI+configJson.updateDetailsAPI+"/"+userId;
    return this.httpClient.put(url,personalInfo,
      {headers,responseType:'json',observe:'response'});
  }

  updateAddress(address:Address){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const userId=sessionStorage.getItem("userId");
    console.log(userId);
    console.log(configJson.cvs247BackendServiceAPI+configJson.updateAddressAPI+"/"+userId);
    let url=configJson.cvs247BackendServiceAPI+configJson.updateAddressAPI+"/"+userId;
    return this.httpClient.put(url,address,
      {headers,responseType:'json',observe:'response'});
  }

}
