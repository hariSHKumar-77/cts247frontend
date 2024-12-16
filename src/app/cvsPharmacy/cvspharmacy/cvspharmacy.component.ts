import { Component, OnInit } from '@angular/core';
import { cart } from 'src/app/model/cart.model';
import { Products } from 'src/app/model/products.model';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cvspharmacy',
  templateUrl: './cvspharmacy.component.html',
  styleUrls: ['./cvspharmacy.component.css']
})
export class CVSPharmacyComponent implements OnInit {

  filteredProducts: any;
  products!: Products[];
  selectedProductQuantity: number;
  cart: cart[] = [];

  constructor(private userservice: UserService, private productservice: ProductService) {



    this.productservice.getProducts().subscribe((res: any) => {
      
      if (res.status == 200) {
        console.log(res.body);
        this.products = res.body;
        console.log(this.products);
      }
    });

    const userId = this.userservice.getUserId();
    this.productservice.getCart(userId).subscribe((res: any) => {
      if (res.status == 200) {
        // return true;
        console.log(res.body);
        console.log(this.cart);
        this.cart=res.body;
        console.log(this.cart);

     
      }
      
    })
    console.log(this.cart);
    console.log(this.isItemInCart(1));



    

   
  }

  ngOnInit(): void {

   
  }
  getCartSize(){
    return this.cart.length;

  }

  OnAddToCart(productId: number) { }
  orderByAsc() {
    this.products.sort(function (a: any, b: any) {
      return ((a.price-(a.discount/100)*a.price) - (b.price-(b.discount/100)*b.price))
    })
  }


  orderByDesc() {
    this.products.sort(function (a: any, b: any) {
      return ((b.price-(b.discount/100)*b.price) - (a.price-(a.discount/100)*a.price))
    })
  }


  addToCart(productId: number) {
    const userId = this.userservice.getUserId();
    this.productservice.addToCart({ userId: userId, productId: productId, quantity: 1 }).subscribe((res: any) => {
      if (res.status == 201) {
        this.cart.push({cartId:res.body.cartId, userId: userId, productId: productId, quantity: 1 ,price:res.body.price});

      }
    })
  }

  getItemQty(productId: number) {
    console.log("qunat");
    return this.cart.find(p => p.productId == productId).quantity;
  }

  isItemInCart(productId: number) {

    // console.log(productId);

    return this.cart.some(p => {
      // console.log(p);
      return p.productId == productId});



  }

  increaseQuantity(productId: number) {
    const userId = this.userservice.getUserId();
    const quantity = this.cart.find(p => p.productId == productId).quantity +1;
    this.productservice.updateCart({ userId: userId, productId: productId, quantity: quantity }).subscribe((res: any) => {
      if (res.status == 200) {
        console.log(productId);
        console.log(this.cart);
        console.log(quantity);
        this.cart.find(p=>p.productId==productId).quantity=quantity;
        console.log(this.cart);
        // this.cart.map(p => p.id == id ? { ...p, qty: p.qty + 1 } : p);

        // this.cart.push({ userId: userId, productId: productId, quantity: quantity });

      }
    })
  };

  decreaseQuantity(productId: number) {
     let userId = this.userservice.getUserId();
    
    let quantity = this.cart.find(p => p.productId == productId).quantity;
    if(quantity>1)quantity=quantity-1;
    else {this.removeFromCart(productId,Number(userId));return;}
    this.productservice.updateCart({ userId: userId, productId: productId, quantity: quantity }).subscribe((res: any) => {
      if (res.status == 200) {
        console.log(productId);
        console.log(this.cart);
        console.log(quantity);
        this.cart.find(p=>p.productId==productId).quantity=quantity;
        console.log(this.cart);
        // this.cart.map(p => p.id == id ? { ...p, qty: p.qty + 1 } : p);

        // this.cart.push({ userId: userId, productId: productId, quantity: quantity });

      }
    })
  }


  
  removeFromCart(productId: number,userId:number) {
    this.productservice.removeFromCart({ userId: userId, productId: productId }).subscribe((res: any) => {
      if (res.status == 200) {
       
        this.cart=this.cart.filter(p=>p.productId!=productId);
        console.log(this.cart);
       
      }
    })
  }
  
  


}
