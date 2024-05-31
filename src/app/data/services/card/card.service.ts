import {ICardRequestModel} from "../../request-models/card/ICard.request-model";
import {inject, Injectable} from "@angular/core";
import {AngularFirestore, DocumentChangeAction, DocumentReference,} from "@angular/fire/compat/firestore";
import {from, map, Observable} from "rxjs";
import {ICardResponseModel} from "../../response-models/card/ICard.response-model";
import {CardModel} from "../../models/card/card.model";


@Injectable()
export class CardService {

    private readonly _firestore: AngularFirestore = inject(AngularFirestore);

    public create(uid: string, card: ICardRequestModel): Observable<CardModel> {
        return from(this._firestore.collection<ICardRequestModel>(`users/${uid}/cards`).add(card))
            .pipe(
                map((obj: DocumentReference<ICardRequestModel>) => {
                    return new CardModel(card, obj.id);
                }),
            );
    }

    public update(uid: string, cardId: string, card: ICardRequestModel): Observable<void> {
        return from(this._firestore.doc<ICardResponseModel>(`users/${uid}/cards/${cardId}`).update(card));
    }

    public getAll(uid: string): Observable<CardModel[]> {
        return this._firestore.collection<ICardResponseModel>(`/users/${uid}/cards`).snapshotChanges()
            .pipe(
                map((doc: DocumentChangeAction<ICardResponseModel>[]) => {
                    return doc.map((obj: DocumentChangeAction<ICardResponseModel>) => {
                        const data: ICardResponseModel = obj.payload.doc.data() as ICardResponseModel;
                        const id: string = obj.payload.doc.id;

                        return new CardModel(data, id);
                    });
                })
            );
    }

    public getById(uid: string, cardId: string): Observable<CardModel> {
        return from(this._firestore.doc<ICardResponseModel>(`users/${uid}/cards/${cardId}`).get()).pipe(
            map((obj: firebase.default.firestore.DocumentSnapshot<ICardResponseModel>) => {
                const data: ICardRequestModel = obj.data() as ICardResponseModel;
                const id: string = obj.id;

                return new CardModel(data, id);
            })
        );
    }

    public delete(uid: string, cardId: string): Observable<void> {
        return from(this._firestore.doc<ICardResponseModel>(`users/${uid}/cards/${cardId}`).delete());
    }
}
