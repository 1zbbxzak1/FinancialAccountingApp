import {paymentType} from "../../directions/payment/paymentType.direction";

export interface IPaymentRequestModel {
    readonly cardId: string,
    readonly totalPayment: number,
    readonly firstContribution: number,
    readonly periodTimestamp: number,
    readonly category: string,
    readonly monthlyPayment: number,
    readonly lastMonthlyPaymentTimestamp: number,
    readonly type: paymentType,
}
