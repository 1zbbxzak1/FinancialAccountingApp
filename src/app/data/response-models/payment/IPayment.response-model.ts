import {IPaymentRequestModel} from "../../request-models/payment/IPayment.request-model";

export interface IPaymentResponseModel extends IPaymentRequestModel {
    readonly paymentId: string
}
