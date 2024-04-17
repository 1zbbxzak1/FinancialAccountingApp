import {ICardRequestModel} from "../request-models/card/ICard.request-model";
import {inject} from "@angular/core";
import {
    AngularFirestore,
    DocumentChangeAction,
    DocumentReference,
} from "@angular/fire/compat/firestore";
import {from, Observable} from "rxjs";



export class CardService {

    private readonly firestore: AngularFirestore = inject(AngularFirestore);

    public create(uid: string, card: ICardRequestModel): Observable<DocumentReference<unknown>> {
        return from(this.firestore.collection(`users/${uid}/cards`).add(card));
    }

    public update(uid: string, cardID: string, card: ICardRequestModel): Observable<void> {
        return from(this.firestore.doc(`users/${uid}/cards/${cardID}`).update(card));

    }

    public getAll(uid: string): Observable<DocumentChangeAction<unknown>[]>  {
        return this.firestore.collection(`/users/${uid}/cards`).snapshotChanges();
    }

    public delete(uid: string, cardID: string): Observable<void> {
        return from(this.firestore.doc(`users/${uid}/cards/${cardID}`).delete());
    }
}
