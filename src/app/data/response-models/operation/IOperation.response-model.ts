import {IOperationRequestModel} from "../../request-models/operation/IOperation.request-model";

export interface IOperationResponseModel extends IOperationRequestModel {
    readonly operationId: string,
}
