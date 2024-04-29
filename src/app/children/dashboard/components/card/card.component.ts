import {Component, Input} from '@angular/core';
import {ICardResponseModel} from '../../../../data/response-models/card/ICard.response-model';


@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrl: './styles/card.component.scss'
})
export class CardComponent {
    @Input()
    public card: ICardResponseModel = {} as ICardResponseModel;
}
