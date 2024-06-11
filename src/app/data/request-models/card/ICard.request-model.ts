import {cardProvider} from "../../directions/card/cardProvider.direction";
import {CardModel} from "../../models/card/card.model";

export interface ICardRequestModel {
    readonly balance: number,
    readonly name: string,
    readonly dateCreatedTimestamp: number,
    readonly provider: cardProvider,
}

export function ToICardRequestModel(card: CardModel): ICardRequestModel {
    return {
        balance: card.balance,
        name: card.name,
        dateCreatedTimestamp: card.dateCreatedTimestamp,
        provider: card.provider,
    };
}
