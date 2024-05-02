import {cardProvider} from "../../directions/card/cardProvider.direction";

export interface ICardRequestModel {
    readonly balance: number,
    readonly name: string,
    readonly dateCreatedTimestamp: number,
    readonly provider: cardProvider,
}
