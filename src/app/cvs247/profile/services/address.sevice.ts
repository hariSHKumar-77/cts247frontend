import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Address } from "src/app/model/address.model";

@Injectable()

export class AddressService {
    // address: Address = new Address('95', 'Bharathi Street','Porur' ,'Chennai', 'Tamil Nadu', 600501 )

    allAddress: Address[] = []

    constructor(private http : HttpClient) {}

    getAddress() {
        // return this.address;
    }

    updateAddress(val : Address) {
        this.http.post('https://cvs247-default-rtdb.firebaseio.com/address.json', val)
    .subscribe((res) => {
      console.log(res);
    })
    }

    fetchAddress() {
        this.http.get<{[key: string]: Address}>('https://cvs247-default-rtdb.firebaseio.com/address.json')
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
            this.allAddress = res;
        })
    }

    editInfo(id: string, value: Address) {
        let currentVal = this.allAddress.find((p) => {return p.id === id})
        //console.log(currentVal)
        this.http.patch('https://cvs247-default-rtdb.firebaseio.com/address/'+id+'.json',value)
        .subscribe();
    }
}