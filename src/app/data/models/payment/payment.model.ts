import {paymentType} from "../../directions/payment/paymentType.direction";
import {IPaymentRequestModel} from "../../request-models/payment/IPayment.request-model";
import {IPaymentResponseModel} from "../../response-models/payment/IPayment.response-model";

export class PaymentModel implements IPaymentResponseModel {

    public paymentId: string;
    public cardId: string;
    public totalPayment: number;
    public firstContribution: number;
    public periodTimestamp: number;
    public category: string;
    public monthlyPayment: number;
    public lastMonthlyPaymentTimestamp: number;
    public type: paymentType;

    constructor(data: IPaymentRequestModel, paymentId: string) {
        this.paymentId = paymentId;
        this.cardId = data.cardId;
        this.totalPayment = data.totalPayment;
        this.firstContribution = data.firstContribution;
        this.periodTimestamp = data.periodTimestamp;
        this.category = data.category;
        this.monthlyPayment = data.monthlyPayment;
        this.lastMonthlyPaymentTimestamp = data.lastMonthlyPaymentTimestamp;
        this.type = data.type;
    }
}
