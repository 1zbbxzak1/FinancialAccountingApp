import {CardService} from "./card.service";
import {inject, Injectable} from "@angular/core";
import {OperationManagerService} from "../operation/operation.manager.service";
import {ICardRequestModel} from "../../request-models/card/ICard.request-model";
import {catchError, forkJoin, map, Observable, switchMap, take} from "rxjs";
import {CardModel} from "../../models/card/card.model";
import {CardWithOperationsModel} from "../../models/card/cardWithOperations.model";
import {OperationModel} from "../../models/operation/operation.model";
import {CustomError} from "../../../global-error-handler/global-error-handler.service";

@Injectable()
export class CardManagerService {

    private readonly _cardService: CardService = inject(CardService);
    private readonly _operationManager: OperationManagerService = inject(OperationManagerService);

    public create(uid: string, card: ICardRequestModel): Observable<CardModel> {
        return this._cardService.create(uid, card).pipe(
            catchError(err => {
                throw new CustomError(err, 'Не удалось создать карту. Повторите попытку');
            })
        );
    }

    public update(uid: string, cardId: string, card: ICardRequestModel): Observable<void> {
        return this._cardService.update(uid, cardId, card).pipe(
            catchError(err => {
                throw new CustomError(err, 'Не удалось обновить карту. Повторите попытку');
            })
        );
    }

    public getAll(uid: string): Observable<CardModel[]> {
        return this._cardService.getAll(uid).pipe(
            catchError(err => {
                throw new CustomError(err, 'Записи о картах не найдены');
            })
        );
    }

    public getById(uid: string, cardId: string): Observable<CardModel> {
        return this._cardService.getById(uid, cardId).pipe(
            catchError(err => {
                throw new CustomError(err, 'Не удалось найти запрашиваемую карту. Повторите попытку');
            })
        );
    }


    public getAllWithOperations(uid: string): Observable<CardWithOperationsModel[]> {
        return this.getAll(uid).pipe(
            switchMap((cards: CardModel[]): Observable<CardWithOperationsModel[]> => {
                return forkJoin(cards.map(
                    (card: CardModel): Observable<CardWithOperationsModel> => {
                        return this._operationManager.getAll(uid, card.cardId).pipe(
                            take(1),
                            map((operations: OperationModel[]): CardWithOperationsModel => {
                                return new CardWithOperationsModel(card, operations);
                            })
                        );
                    }
                ));
            })
        );
    }


    public delete(uid: string, cardId: string): Observable<void> {
        return this._cardService.delete(uid, cardId).pipe(
            catchError(err => {
                throw new CustomError(err, 'Не удалось удалить выбранную карту. Повторите попытку');
            })
        );
    }
}
