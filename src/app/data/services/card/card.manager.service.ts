import {CardService} from "./card.service";
import {inject} from "@angular/core";
import {OperationManagerService} from "../operation/operation.manager.service";
import {ICardRequestModel} from "../../request-models/card/ICard.request-model";
import {catchError, concatMap, map, NEVER, Observable} from "rxjs";
import {CardModel} from "../../models/card/card.model";
import {CardWithOperationsModel} from "../../models/card/cardWithOperations.model";
import {OperationModel} from "../../models/operation/operation.model";


export class CardManagerService {

    private readonly _cardService: CardService = inject(CardService);
    private readonly _operationManager: OperationManagerService = inject(OperationManagerService);

    public create(uid: string, card: ICardRequestModel): Observable<CardModel> {
        return this._cardService.create(uid, card).pipe(
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return NEVER;
            })
        );
    }

    public update(uid: string, cardId: string, card: ICardRequestModel): Observable<void> {
        return this._cardService.update(uid, cardId, card).pipe(
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return NEVER;
            })
        );
    }

    public getAll(uid: string): Observable<CardModel[]> {
        return this._cardService.getAll(uid).pipe(
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return NEVER;
                // throwError() Закидывать ошибки для обработки в ErrorHandler
            })
        );
    }

    public getById(uid: string, cardId: string): Observable<CardModel> {
        return this._cardService.getById(uid, cardId).pipe(
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return NEVER;
            })
        );
    }


    public getAllWithOperations(uid: string): Observable<Observable<CardWithOperationsModel>> {
        return this.getAll(uid).pipe(
            concatMap((cards: CardModel[]) => {
                return cards.map((card: CardModel) => {
                    return this._operationManager.getAll(uid, card.cardId).pipe(
                        map((operations: OperationModel[]) => {
                            return new CardWithOperationsModel(card, operations);
                        })
                    );
                });
            })
        );
    }


    public delete(uid: string, cardId: string): Observable<void> {
        return this._cardService.delete(uid, cardId).pipe(
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return NEVER;
            })
        );
    }
}
