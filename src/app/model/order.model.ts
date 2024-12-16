import { BillingAddress } from "./billingAddress.model";
import { OrderItem } from "./orderItem.model";
import { Products } from "./products.model";

export class Order {
         
  public customerName:any;
  public orderDate:any;
  public orderNumber:any;
  public totalPrice:any;
  public productList:OrderItem[];

  constructor(){

  }

}