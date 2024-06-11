import {AngularFirestore, DocumentChangeAction, DocumentReference} from "@angular/fire/compat/firestore";
import {inject, Injectable} from "@angular/core";
import {IOperationRequestModel} from "../../request-models/operation/IOperation.request-model";
import {from, map, Observable} from "rxjs";
import {IOperationResponseModel} from "../../response-models/operation/IOperation.response-model";
import {OperationModel} from "../../models/operation/operation.model";


@Injectable()
export class OperationService {

    private readonly _firestore: AngularFirestore = inject(AngularFirestore);

    public create(uid: string, operation: IOperationRequestModel): Observable<OperationModel> {
        return from(this._firestore.collection<IOperationRequestModel>(`users/${uid}/cards/${operation.cardId}/operations`).add(operation))
            .pipe(
                map((obj: DocumentReference<IOperationRequestModel>) => {
                    return new OperationModel(operation, obj.id);
                }),
            );
    }

    public update(uid: string, operationId: string, operation: IOperationRequestModel): Observable<void> {
        return from(this._firestore.doc(`users/${uid}/cards/${operation.cardId}/operations/${operationId}`).update(operation));
    }

    public getAll(uid: string, cardId: string): Observable<OperationModel[]> {
        return this._firestore.collection<IOperationResponseModel>(`/users/${uid}/cards/${cardId}/operations`).snapshotChanges()
            .pipe(
                map((doc: DocumentChangeAction<IOperationResponseModel>[]) => {
                    return doc.map((obj: DocumentChangeAction<IOperationResponseModel>) => {
                        const data: IOperationResponseModel = obj.payload.doc.data() as IOperationResponseModel;
                        const operationId: string = obj.payload.doc.id;

                        return new OperationModel(data, operationId);
                    });
                }),
            );
    }

    public getById(uid: string, cardId: string, operationId: string): Observable<OperationModel> {
        return from(this._firestore.doc<IOperationResponseModel>(`users/${uid}/cards/${cardId}/operations/${operationId}`).get()).pipe(
            map((obj: firebase.default.firestore.DocumentSnapshot<IOperationResponseModel>) => {
                const data: IOperationResponseModel = obj.data() as IOperationResponseModel;
                const operationId: string = obj.id;

                return new OperationModel(data, operationId);
            })
        );
    }

    public delete(uid: string, cardId: string, operationId: string): Observable<void> {
        return from(this._firestore.doc<IOperationResponseModel>(`users/${uid}/cards/${cardId}/operations/${operationId}`).delete());
    }
}
