import {Component, Input} from '@angular/core';
import {CardModel} from "../../../../data/models/card/card.model";


@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrl: './styles/card.component.scss'
})
export class CardComponent {
    @Input({required: true})
    public card!: CardModel;
}
