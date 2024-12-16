import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderItem } from 'src/app/model/orderItem.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  
  customerName:any;
  orderDate:any;
  orderNumber:any;
  totalPrice:any;
  orderItems:OrderItem[]=[];


  constructor(private route:ActivatedRoute,private router:Router,private productservice:ProductService) { 
    
  
    this.route.queryParams.subscribe(params => {
      this.orderNumber=params['orderNumber'];
    });


    this.productservice.getOrderDetails(this.orderNumber).subscribe((res: any) => {
      if (res.status == 200) {

        console.log(res.body);
        this.customerName=res.body.customerName;
        this.orderDate=res.body.orderDate;
        this.orderNumber=res.body.orderNumber;
        this.totalPrice=res.body.totalPrice;
        this.orderItems=res.body.productList;        
        
      }

    })


  }
  
  ngOnInit(): void {
  


  }



}
