import {OperationService} from "./operation.service";
import {inject} from "@angular/core";
import {catchError, NEVER, Observable, of} from "rxjs";
import {IOperationRequestModel} from "../../request-models/operation/IOperation.request-model";
import {OperationModel} from "../../models/operation/operation.model";
import {CustomError} from "../../../global-error-handler/global-error-handler.service";

export class OperationManagerService {

    private readonly _operationService: OperationService = inject(OperationService);

    public create(uid: string, operation: IOperationRequestModel): Observable<OperationModel> {
        return this._operationService.create(uid, operation).pipe(
            catchError(err => {
                throw new CustomError(err, 'Не удалось создать операцию. Повторите попытку');
            })
        );
    }

    public update(uid: string, operationID: string, operation: IOperationRequestModel): Observable<void> {
        return this._operationService.update(uid, operationID, operation).pipe(
            catchError(err => {
                throw new CustomError(err, 'Не удалось обновить данные операции. Повторите попытку');
            })
        );
    }

    public getAll(uid: string, cardID: string): Observable<OperationModel[]> {
        return this._operationService.getAll(uid, cardID).pipe(
            catchError(err => {
                throw new CustomError(err, 'Записи об операциях по карте не найдены');
            })
        );
    }

    public getByID(uid: string, cardID: string, operationID: string): Observable<OperationModel> {
        return this._operationService.getById(uid, cardID, operationID).pipe(
            catchError(err => {
                throw new CustomError(err, 'Не удалось найти запрашиваемую операцию. Повторите попытку');
            })
        );
    }

    public delete(uid: string, cardID: string, operationID: string): Observable<void> {
        return this._operationService.delete(uid, cardID, operationID).pipe(
            catchError(err => {
                throw new CustomError(err, 'Не удалось удалить выбранную операцию. Повторите попытку');
            })
        );
    }
}
