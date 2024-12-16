import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import configJson from "../../assets/configuration/config.json";
import { Address } from '../model/address.model';
import { PersonalInfo } from '../model/personalInfo.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private route: Router,    private httpClient: HttpClient,private userService:UserService) { }
    

  
  getProducts(){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const userId=sessionStorage.getItem("userId");
    return this.httpClient.get(configJson.cvs247BackendServiceAPI+configJson.getProductsAPI,
      {headers,responseType:'json',observe:'response'});
 
  }

  addToCart(cart:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(configJson.cvs247BackendServiceAPI+configJson.addToCartAPI,cart,
      {headers,responseType:'json',observe:'response'});
 
  }


  updateCart(cart:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.put(configJson.cvs247BackendServiceAPI+configJson.updateCartAPI,cart,
      {headers,responseType:'json',observe:'response'});
 
  }



 
  getCart(userId:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.get(configJson.cvs247BackendServiceAPI+configJson.getCartAPI+"/"+userId,
      {headers,responseType:'json',observe:'response'});
 
  }

  getCartItems(userId:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.get(configJson.cvs247BackendServiceAPI+configJson.getCartItemsAPI+"/"+userId,
      {headers,responseType:'json',observe:'response'});
 
  }


 
  isItemInCart(cart:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(configJson.cvs247BackendServiceAPI+configJson.isItemInCart,cart,
      {headers,responseType:'json',observe:'response'});
 
  }


  removeFromCart(cart:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.request('DELETE',configJson.cvs247BackendServiceAPI+configJson.removeFromCartAPI,{headers,body:cart,responseType:'text',observe:'response'});

  }

  placeOrder(orderDetails:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post(configJson.cvs247BackendServiceAPI+configJson.placeOrderAPI,orderDetails,
      {headers,responseType:'json',observe:'response'});
 
  }

  getOrderDetails(orderNumber:any){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.get(configJson.cvs247BackendServiceAPI+configJson.getOrderDetails+"/"+orderNumber,
      {headers,responseType:'json',observe:'response'});
 
  }

  getPurchaseHistory(userId:Number){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.get(configJson.cvs247BackendServiceAPI+configJson.purchaseHistoryAPI+"/"+userId,
      {headers,responseType:'json',observe:'response'});
 
  }


}
