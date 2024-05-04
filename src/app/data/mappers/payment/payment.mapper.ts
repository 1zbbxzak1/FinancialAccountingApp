import {PaymentModel} from "../../models/payment/payment.model";
import {IPaymentRequestModel} from "../../request-models/payment/IPayment.request-model";

export class PaymentMapper {

    public ToIPaymentRequestModel(payment: PaymentModel): IPaymentRequestModel {
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
}
