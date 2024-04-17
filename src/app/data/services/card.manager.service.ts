import {CardService} from "./card.service";
import {inject} from "@angular/core";
import {ICardRequestModel} from "../request-models/card/ICard.request-model";
import {catchError, map, Observable, of} from "rxjs";
import {DocumentChangeAction, DocumentReference} from "@angular/fire/compat/firestore";
import {ICardResponseModel} from "../response-models/card/ICard.response-model";

export class CardManagerService {

    private readonly cardService: CardService = inject(CardService);

    public create(uid: string, card: ICardRequestModel): Observable<string | undefined> {
        return this.cardService.create(uid, card).pipe(
            map((obj: DocumentReference<unknown>) => {
                return obj.id;
            }),
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return of(undefined);
            })
        );
    }

    public update(uid: string, cardID: string, card: ICardRequestModel): void {
        this.cardService.update(uid, cardID, card).pipe(
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return of(undefined);
            })
        );
    }

    public getAll(uid: string): Observable<ICardResponseModel[] | undefined> {
        return this.cardService.getAll(uid).pipe(
            map((doc: DocumentChangeAction<unknown>[]) => {
                return doc.map( (obj: DocumentChangeAction<unknown>) => {
                    const data = obj.payload.doc.data() as ICardResponseModel;
                    const id = obj.payload.doc.id;
                    return {
                        cardID: id,
                        balance: data.balance,
                        name: data.name,
                        dateCreated: data.dateCreated,
                        provider: data.provider,
                    } as ICardResponseModel;
                });
            }),
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return of(undefined);
            })
        );
    }

    public delete(uid: string, cardID: string): void {
        this.cardService.delete(uid, cardID).pipe(
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return of(undefined);
            })
        );
    }
}
