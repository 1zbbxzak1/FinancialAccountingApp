import {ICardRequestModel} from "../../request-models/card/ICard.request-model";

export interface ICardResponseModel extends ICardRequestModel {
    readonly cardId: string,
}
