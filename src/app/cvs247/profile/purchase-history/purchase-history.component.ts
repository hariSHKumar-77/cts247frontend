import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order.model';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { PurchaseHistoryService } from '../services/purchaseHistory.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {
  orders: Order[]=[];

  constructor(private productService:ProductService,private userService:UserService) { }

  ngOnInit(): void {

    let userId = this.userService.getUserId();

    this.productService.getPurchaseHistory(Number(userId)).subscribe((response: any) => {

      if(response.status==200){
        
        console.log(response.body);
        this.orders=response.body;
        console.log(this.orders);
        
      }


  }); 
    //this.orders = this.purchaseHistoryService.getOrderHistory();
    //this.purchaseHistoryService.updateInfo(this.orders);
    // this.purchaseHistoryService.fetchHistory();
    // this.orders = this.purchaseHistoryService.allOrder;
  }

}
