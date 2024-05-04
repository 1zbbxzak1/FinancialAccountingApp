import {OperationModel} from "../../models/operation/operation.model";
import {IOperationRequestModel} from "../../request-models/operation/IOperation.request-model";

export class OperationMapper {

    public ToIOperationRequestModel(operation: OperationModel): IOperationRequestModel {
        return {
            cardId: operation.cardId,
            name: operation.name,
            category: operation.category,
            amount: operation.amount,
            dateTimestamp: operation.dateTimestamp,
        };
    }
}
