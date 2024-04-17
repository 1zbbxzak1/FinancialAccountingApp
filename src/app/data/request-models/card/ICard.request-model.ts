import {cardProvider} from "../../directions/cardProvider.direction";

export interface ICardRequestModel {
    readonly balance: string,
    readonly name: string,
    readonly dateCreated: Date,
    readonly provider: cardProvider,
}
