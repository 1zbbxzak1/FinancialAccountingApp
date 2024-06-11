import {paymentType} from "../../directions/payment/paymentType.direction";
import {PaymentModel} from "../../models/payment/payment.model";

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

export function ToIPaymentRequestModel(payment: PaymentModel): IPaymentRequestModel {
    return {
        cardId: payment.cardId,
        totalPayment: payment.totalPayment,
        firstContribution: payment.firstContribution,
        periodTimestamp: payment.periodTimestamp,
        category: payment.category,
        monthlyPayment: payment.monthlyPayment,
        lastMonthlyPaymentTimestamp: payment.lastMonthlyPaymentTimestamp,
        type: payment.type,
    };
}
