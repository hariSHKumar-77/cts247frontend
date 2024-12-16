export class BillingAddress {
    constructor(
        public billingId : number,
        public customerName : string,
        public customerPhoneNumber : number,
        public customerAddress : string
    ) {}
}