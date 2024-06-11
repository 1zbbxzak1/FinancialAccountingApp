import {AngularFirestore, DocumentChangeAction, DocumentReference} from "@angular/fire/compat/firestore";
import {inject, Injectable} from "@angular/core";
import {IPaymentRequestModel} from "../../request-models/payment/IPayment.request-model";
import {from, map, Observable} from "rxjs";
import {IPaymentResponseModel} from "../../response-models/payment/IPayment.response-model";
import {PaymentModel} from "../../models/payment/payment.model";

@Injectable()
export class PaymentService {

    private readonly _firestore: AngularFirestore = inject(AngularFirestore);

    public create(uid: string, payment: IPaymentRequestModel): Observable<PaymentModel> {
        return from(this._firestore.collection<IPaymentRequestModel>(`users/${uid}/payments`).add(payment))
            .pipe(
                map((obj: DocumentReference<IPaymentRequestModel>) => {
                    return new PaymentModel(payment, obj.id);
                }),
            );
    }

    public update(uid: string, paymentId: string, payment: IPaymentRequestModel): Observable<void> {
        return from(this._firestore.doc<IPaymentResponseModel>(`users/${uid}/payments/${paymentId}`).update(payment));
    }

    public getAll(uid: string): Observable<PaymentModel[]> {
        return from(this._firestore.collection<IPaymentResponseModel>(`users/${uid}/payments`).snapshotChanges()).pipe(
            map((doc: DocumentChangeAction<IPaymentResponseModel>[]) => {
                return doc.map((obj: DocumentChangeAction<IPaymentResponseModel>) => {
                    const data: IPaymentResponseModel = obj.payload.doc.data() as IPaymentResponseModel;
                    const paymentId: string = obj.payload.doc.id;

                    return new PaymentModel(data, paymentId);
                });
            })
        );
    }

    public getById(uid: string, paymentId: string): Observable<PaymentModel> {
        return from(this._firestore.doc<IPaymentResponseModel>(`users/${uid}/payments/${paymentId}`).get().pipe(
            map((obj: firebase.default.firestore.DocumentSnapshot<IPaymentResponseModel>) => {
                const data: IPaymentResponseModel = obj.data() as IPaymentResponseModel;
                const paymentId: string = obj.id;

                return new PaymentModel(data, paymentId);
            })
        ));
    }

    public delete(uid: string, paymentId: string): Observable<void> {
        return from(this._firestore.doc<IPaymentResponseModel>(`users/${uid}/payments/${paymentId}`).delete());
    }
}
