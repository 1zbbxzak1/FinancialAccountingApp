import {OperationService} from "./operation.service";
import {inject, Injectable} from "@angular/core";
import {catchError, Observable} from "rxjs";
import {IOperationRequestModel} from "../../request-models/operation/IOperation.request-model";
import {OperationModel} from "../../models/operation/operation.model";
import {CustomError} from "../../../global-error-handler/global-error-handler.service";


@Injectable()
export class OperationManagerService {

    private readonly _operationService: OperationService = inject(OperationService);

    public create(uid: string, operation: IOperationRequestModel): Observable<OperationModel> {
        return this._operationService.create(uid, operation).pipe(
            catchError(err => {
                throw new CustomError(err, 'Не удалось создать операцию. Повторите попытку');
            })
        );
    }

    public update(uid: string, operationId: string, operation: IOperationRequestModel): Observable<void> {
        return this._operationService.update(uid, operationId, operation).pipe(
            catchError(err => {
                throw new CustomError(err, 'Не удалось обновить данные операции. Повторите попытку');
            })
        );
    }

    public getAll(uid: string, cardId: string): Observable<OperationModel[]> {
        return this._operationService.getAll(uid, cardId).pipe(
            catchError(err => {
                throw new CustomError(err, 'Записи об операциях по карте не найдены');
            })
        );
    }

    public getByID(uid: string, cardId: string, operationId: string): Observable<OperationModel> {
        return this._operationService.getById(uid, cardId, operationId).pipe(
            catchError(err => {
                throw new CustomError(err, 'Не удалось найти запрашиваемую операцию. Повторите попытку');
            })
        );
    }

    public delete(uid: string, cardId: string, operationId: string): Observable<void> {
        return this._operationService.delete(uid, cardId, operationId).pipe(
            catchError(err => {
                throw new CustomError(err, 'Не удалось удалить выбранную операцию. Повторите попытку');
            })
        );
    }
}
