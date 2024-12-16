import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { BillingAddress } from "src/app/model/billingAddress.model";
import { Order } from "src/app/model/order.model";
import { Products } from "src/app/model/products.model";
@Injectable()

export class PurchaseHistoryService {

// orders : Order = 
//     new Order(
//       1,
//       3,
//       12,
//       'jimmy',
//       9845788802,
//       'may 25',
//       200,
//       [
//         new Products('https://i5.walmartimages.com/asr/567ae635-44c2-481d-a151-7e26411e65ad.85cd91ee4e7cef09d9fc4a9ab9a05bfa.jpeg',1,'Nyquil',85,1),
//         new Products('https://th.bing.com/th/id/R.2d6909b4e58ea73ecbf7c9de1916c898?rik=G550EMiZcCP4yQ&riu=http%3a%2f%2fpics2.ds-static.com%2fprodimg%2f497286%2f300.JPG&ehk=tNgj3%2fNt6XPcwKlTbWeqtD5EjKJSR921ZZqdpNTsBwE%3d&risl=&pid=ImgRaw&r=0',2,'Dayquil',95,1)
//       ],
//       [
//         new BillingAddress(6,'jim',8748374999,'69,white town,Puducherry')
//       ]
//     )
    // new Order(
    //   2,
    //   4,
    //   14,
    //   'john',
    //   8758498674,
    //   'july 25',
    //   450,
    //   [
    //     new Products('https://th.bing.com/th/id/R.fc4ed0587180ee949a91c35f254b4977?rik=m%2bbEBQ5Rp%2fyr%2bw&riu=http%3a%2f%2fimages-its.chemistdirect.co.uk%2fPeptac-Peppermint-Liquid-11409.jpg%3fo%3doUYdmPGJ825PDNzoHQ%24ylddmfPcj%26V%3dHnr3&ehk=AhxB0B14oOT1oUQ9ueYtz2p52c01l%2fuygq2wtNwxT6c%3d&risl=&pid=ImgRaw&r=0',4,'peptak',185,2)
    //   ],
    //   [
    //     new BillingAddress(2,'ben',82738628876,'87, zee lane,mumbai')
    //   ]
    // )
  

  allOrder : Order[] = [];

  constructor(private http: HttpClient) {
    //this.getOrderHistory()
  }

  // getOrderHistory() {
  //   return this.updateInfo(this.orders);
  // }

  updateInfo(val : Order) {
    this.http.post('https://cvs247-default-rtdb.firebaseio.com/purchaseHistory.json', val)
.subscribe((res) => {
  console.log(res);
})
}

fetchHistory() {
  this.http.get<{[key: string]: Order}>('https://cvs247-default-rtdb.firebaseio.com/purchaseHistory.json')
  .pipe(map((res) => {
  const pInfo = [];
    for(const key in res){
      if(res.hasOwnProperty(key)) {
          pInfo.push({...res[key], id: key})
      }
    }
    return pInfo;
  }))
  .subscribe((res) => {
      console.log(res);
      this.allOrder = res;
  })
}

}