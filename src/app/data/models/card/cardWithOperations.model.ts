import {OperationModel} from "../operation/operation.model";
import {CardModel} from "./card.model";

export class CardWithOperationsModel {

    public card: CardModel;
    public operations: OperationModel[];

    constructor(card: CardModel, operations: OperationModel[]) {
        this.card = card;
        this.operations = operations;
    }
}
