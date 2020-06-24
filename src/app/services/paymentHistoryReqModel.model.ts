export class PaymentHistoryReqModel {
    constructor(
        public dateFrom: string,
        public dateTo: string,
        public pin: string
    ) {}
}
