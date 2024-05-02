import {DestroyRef, inject} from "@angular/core";
import {PaymentService} from "./payment.service";
import {IPaymentRequestModel} from "../../request-models/payment/IPayment.request-model";
import {catchError, map, NEVER, Observable, Subscriber} from "rxjs";
import {CardManagerService} from "../card/card.manager.service";
import {PaymentModel} from "../../models/payment/payment.model";
import {CardModel} from "../../models/card/card.model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {paymentType} from "../../directions/payment/paymentType.direction";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";

export class PaymentManagerService {
    private readonly _cardManager: CardManagerService = inject(CardManagerService);
    private readonly _paymentService: PaymentService = inject(PaymentService);
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);

    public create(uid: string, payment: IPaymentRequestModel): Observable<PaymentModel> {
        this.addToCardBalanceOfPaymentType(uid, payment.cardId, -payment.firstContribution, payment.type);

        return this._paymentService.create(uid, payment).pipe(
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return NEVER;
            })
        );
    }

    public update(uid: string, paymentId: string, payment: IPaymentRequestModel): Observable<void> {
        return this._paymentService.update(uid, paymentId, payment).pipe(
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return NEVER;
            })
        );
    }

    public getAll(uid: string): Observable<PaymentModel[]> {
        return this._paymentService.getAll(uid).pipe(
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return NEVER;
            })
        );
    }

    public getById(uid: string, paymentId: string): Observable<PaymentModel> {
        return this._paymentService.getById(uid, paymentId).pipe(
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return NEVER;
            })
        );
    }

    public delete(uid: string, payment: PaymentModel,
                  addFirstContributionToCard: boolean, addTotalPaymentToCard: boolean): Observable<void> {
        if (addFirstContributionToCard) {
            this.addToCardBalance(uid, payment.cardId, payment.firstContribution);
        }

        if (addTotalPaymentToCard) {
            this.addToCardBalance(uid, payment.cardId, payment.totalPayment);
        }

        return this._paymentService.delete(uid, payment.paymentId).pipe(
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return NEVER;
            })
        );
    }

    public canMakePayment(uid: string, payment: PaymentModel): Observable<boolean> {
        const lastPayment: Date = new Date(payment.lastMonthlyPaymentTimestamp);
        const period: Date = new Date(payment.periodTimestamp);

        const isDatePayment: boolean = lastPayment.getMonth() !== period.getMonth() && lastPayment.getFullYear() <= period.getFullYear();

        return this._cardManager.getById(uid, payment.cardId).pipe(
            map((card: CardModel): boolean => {
                const isBalanceSufficient: boolean = card.balance - payment.monthlyPayment >= 0;

                return isDatePayment && isBalanceSufficient;
            })
        );
    }

    public calculateCountPayment(lastMonthlyPaymentTimestamp: number, periodTimestamp: number): Observable<number> {
        const lastPayment: Date = new Date(lastMonthlyPaymentTimestamp);
        const period: Date = new Date(periodTimestamp);

        const startYear: number = lastPayment.getFullYear();
        const startMonth: number = lastPayment.getMonth();

        const endYear: number = period.getFullYear();
        const endMonth: number = period.getMonth();

        const yearDifference: number = endYear - startYear;
        const monthDifference: number = endMonth - startMonth;

        const countPayments: number = yearDifference * 12 + monthDifference;

        return new Observable<number>((observer: Subscriber<number>): void => {
            observer.next(countPayments);
            observer.complete();
        });
    }


    public makePayment(uid: string, payment: PaymentModel): Observable<PaymentModel> {
        payment.totalPayment += payment.monthlyPayment;

        this.addToCardBalanceOfPaymentType(uid, payment.cardId, payment.monthlyPayment, payment.type);

        payment.lastMonthlyPaymentTimestamp = dateTimestampProvider.now();

        this.update(uid, payment.paymentId, payment);

        return new Observable<PaymentModel>((observer: Subscriber<PaymentModel>): void => {
            observer.next(payment);
            observer.complete();
        });
    }

    private addToCardBalanceOfPaymentType(uid: string, cardId: string, sum: number, paymentType: paymentType): Observable<void> {
        switch (paymentType) {
            case ('credit'):
                this.addToCardBalance(uid, cardId, -sum);
                break;
            case ('deposit'):
                this.addToCardBalance(uid, cardId, sum);
                break;
            default:
            // throw new Error();
        }

        return new Observable<void>();
    }

    private addToCardBalance(uid: string, cardId: string, sum: number): Observable<void> {
        this._cardManager.getById(uid, cardId)
            .pipe(
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe(
                (card: CardModel): void => {
                    card.balance += sum;
                    this._cardManager.update(uid, cardId, card);
                }
            );

        return new Observable<void>();
    }
}
