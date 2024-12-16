import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from 'src/app/model/products.model';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService:UserService,public router:Router,private productservice:ProductService) { }
  @Input() cartSize = 0; // decorate the property with @Input()


  noOfItems:number=2;

  isLoggedin:boolean=false;
  routerLink!:string
  ngOnInit(): void {
    console.log(this.router.url.startsWith("/CVSPharmacy"));

    this.isLoggedin=this.userService.isLoggedIn();
    if(this.isLoggedin==true){
      console.log(this.router.url); 
      if(this.router.url=='/CVSPharmacy')this.routerLink="/CVSPharmacy/cart";
      else this.routerLink="/personal-info";
    }
    else this.routerLink="/login";  
    



  }

  getImage(){
    return sessionStorage.getItem("imageUrl");
  }


 
}
