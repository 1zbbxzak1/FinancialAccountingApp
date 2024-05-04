import {CardModel} from "../../models/card/card.model";
import {ICardRequestModel} from "../../request-models/card/ICard.request-model";

export class CardMapper {

    public ToICardRequestModel(card: CardModel): ICardRequestModel {
        return {
            balance: card.balance,
            name: card.name,
            dateCreatedTimestamp: card.dateCreatedTimestamp,
            provider: card.provider,
        };
    }
}
