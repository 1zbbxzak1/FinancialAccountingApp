import {cardProvider} from "../../directions/card/cardProvider.direction";
import {ICardRequestModel} from "../../request-models/card/ICard.request-model";
import {ICardResponseModel} from "../../response-models/card/ICard.response-model";

export class CardModel implements ICardResponseModel {

    public cardId: string;
    public balance: number;
    public name: string;
    public dateCreatedTimestamp: number;
    public dateCreated: Date;
    public provider: cardProvider;
    public isSelected: boolean = false;

    constructor(data: ICardRequestModel, cardId: string) {
        this.cardId = cardId;
        this.balance = data.balance;
        this.name = data.name;
        this.dateCreatedTimestamp = data.dateCreatedTimestamp;
        this.dateCreated = new Date(data.dateCreatedTimestamp);
        this.provider = data.provider;
    }
}
