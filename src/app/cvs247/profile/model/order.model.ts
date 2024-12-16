import { BillingAddress } from "./billingAddress.model";
import { Products } from "./products.model";

export class Order {
    constructor(
        public orderId: number, 
        public userId: number,
        public orderNumber: number,
        public customerName: string,
        public phoneNum: number,
        public orderDate: string, 
        public totalPrice: number,
        public products: Products[],
        public billing : BillingAddress[],
        public id? : string,
        ) {}
}