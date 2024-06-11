import {IOperationRequestModel} from "../../request-models/operation/IOperation.request-model";
import {IOperationResponseModel} from "../../response-models/operation/IOperation.response-model";

export class OperationModel implements IOperationResponseModel {

    public operationId: string;
    public cardId: string;
    public name: string;
    public category: string;
    public amount: number;
    public dateTimestamp: number;
    public date: Date;

    constructor(data: IOperationRequestModel, operationId: string) {
        this.operationId = operationId;
        this.cardId = data.cardId;
        this.name = data.name;
        this.category = data.category;
        this.amount = data.amount;
        this.dateTimestamp = data.dateTimestamp;
        this.date = new Date(data.dateTimestamp);
    }
}
