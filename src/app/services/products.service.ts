import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import configJson from "../../assets/configuration/config.json";
import { Address } from '../cvs247/profile/model/address.model';
import { PersonalInfo } from '../cvs247/profile/model/personalInfo.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private route: Router,
    private httpClient: HttpClient,
    ) { }
    
  isLoggedIn(): boolean {
    const user = sessionStorage.getItem("userId");
    if (user != null) {
        return true
    }
    return false;
  }

  
//   getProducts(){
//     const headers = new HttpHeaders().set('Content-Type', 'application/json');
//     // const phNumjwber=sessionStorage.getItem("phNumber");
//     return this.httpClient.get(configJson.cvs247BackendServiceAPI+configJson.userDetailsAPI+"/"+phNumber,
//       {headers,responseType:'json',observe:'response'});
  
//   }

}
