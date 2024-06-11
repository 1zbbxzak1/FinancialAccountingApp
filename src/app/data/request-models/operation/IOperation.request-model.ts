import {OperationModel} from "../../models/operation/operation.model";

export interface IOperationRequestModel {
    readonly cardId: string,
    readonly name: string,
    readonly category: string,
    readonly amount: number,
    readonly dateTimestamp: number,
}

export function ToIOperationRequestModel(operation: OperationModel): IOperationRequestModel {
    return {
        cardId: operation.cardId,
        name: operation.name,
        category: operation.category,
        amount: operation.amount,
        dateTimestamp: operation.dateTimestamp,
    };
}
