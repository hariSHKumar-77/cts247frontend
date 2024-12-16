import { Component } from '@angular/core';
import { faCartShopping, faCircleUser, faIndianRupeeSign, faReceipt, faTrash, faTruck } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from 'src/app/model/cartItem.model';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartIcon = faCartShopping;
  truckIcon = faTruck;
  rupee = faIndianRupeeSign;
  summary = faReceipt;
  user = faCircleUser;
  delete = faTrash;

  cartItems: CartItem[] = [];
  itemsPrice=0;
  deliveryCharge=0;  
  totalPrice=0;


  discount: number = 0;
 

  billingForm!: FormGroup;



  constructor(private formBuilder: FormBuilder, private userservice: UserService, private productservice: ProductService,private router:Router) {

    const userId = this.userservice.getUserId();
    this.productservice.getCartItems(userId).subscribe((res: any) => {
      if (res.status == 200) {
        // return true;
        console.log(res.body);
        console.log(this.cartItems);
        this.cartItems = res.body;
        console.log(this.cartItems);


        this.getItemsPrice();
        this.getDeliveryCharge();
        
      }

    })
    console.log(this.cartItems);

    this.billingForm = this.formBuilder.group({
      billingName: ['', [Validators.required]],
      billingAddress: ['', [Validators.required]],
      billingPhNumber: ['', [Validators.required]],
      deliveryType: ["InstDelv", [Validators.required]],
    });

    console.log(this.billingForm.controls['billingAddress']);
    

  }

  ngOnInit() {
    
  
    

  }

  onClick(delvType: any) {
    console.log(delvType);
    // this.delvOpt=delvType;
    this.billingForm.controls['deliveryType'].setValue(delvType);
    this.getDeliveryCharge();
  }



  getItemQty(productId: number) {
    // console.log("qunat");
    return this.cartItems.find(p => p.productId == productId).quantity;
  }

  increaseQuantity(productId: number) {
    const userId = this.userservice.getUserId();
    const quantity = this.cartItems.find(p => p.productId == productId).quantity + 1;
    this.productservice.updateCart({ userId: userId, productId: productId, quantity: quantity }).subscribe((res: any) => {
      if (res.status == 200) {
        console.log(productId);
        console.log(this.cartItems);
        console.log(quantity);
        this.cartItems.find(p => p.productId == productId).quantity = quantity;
        console.log(this.cartItems);
        this.getItemsPrice();
        // this.cart.map(p => p.id == id ? { ...p, qty: p.qty + 1 } : p);

        // this.cart.push({ userId: userId, productId: productId, quantity: quantity });

      }
    })
    
  };

  decreaseQuantity(productId: number) {
    let userId = this.userservice.getUserId();

    let quantity = this.cartItems.find(p => p.productId == productId).quantity;
    if (quantity > 1) quantity = quantity - 1;
    else { this.removeFromCart(productId); return; }
    this.productservice.updateCart({ userId: userId, productId: productId, quantity: quantity }).subscribe((res: any) => {
      if (res.status == 200) {
        console.log(productId);
        console.log(this.cartItems);
        console.log(quantity);
        this.cartItems.find(p => p.productId == productId).quantity = quantity;
        console.log(this.cartItems);
        this.getItemsPrice();
        // this.cart.map(p => p.id == id ? { ...p, qty: p.qty + 1 } : p);

        // this.cart.push({ userId: userId, productId: productId, quantity: quantity });

      }
    })
    
  }

  getItemsPrice() {
    let itemsPrice=0;
    for(var i=0;i<this.cartItems.length;i++){
      itemsPrice += ((this.cartItems[i].price-(this.cartItems[i].discount/100)*this.cartItems[i].price) * this.cartItems[i].quantity);
    }
    
    this.itemsPrice= itemsPrice;
    console.log(itemsPrice);
  }

  getTotalPrice(){
    this.totalPrice= this.itemsPrice+this.deliveryCharge;
  }

  getDeliveryCharge(){
    if(this.billingForm.controls['deliveryType'].value=="InstDelv")this.deliveryCharge= 100;
    else this.deliveryCharge= 50;


  }

  removeFromCart(productId: number) {
    console.log(productId);
    let userId = this.userservice.getUserId();

    this.productservice.removeFromCart({ userId: userId, productId: productId }).subscribe((res: any) => {
      if (res.status == 200) {

        this.cartItems = this.cartItems.filter(p => p.productId != productId);
        console.log(this.cartItems);
        this.getItemsPrice();

      }
    })

    
  }

  isCartEmpty() {
    console.log("ff");
    // console.log("is cart empty ",this.cart?.products?.length==0);
    console.log(this.cartItems);
    return this.cartItems.length == 0;
  }




  submitForm(): void {
    // Handle form submission
    // this.dateTransform();

    console.log(this.billingForm.value);
    let userId = this.userservice.getUserId();
    this.productservice.placeOrder({...this.billingForm.value,userId:Number(userId)}).subscribe((response: any) => {

      
      if (response.status == 201) {
        // this.userService.loginSuccessful(response.body);
        // this.router.navigate(['/CVSPharmacy/checkout,{ queryParams: { phNumber: phNumber } });
        this.router.navigate(['/CVSPharmacy/checkout'], { queryParams: { orderNumber:response.body.orderNumber } });
        console.log(response.body);  
      }

    });
  }
}


