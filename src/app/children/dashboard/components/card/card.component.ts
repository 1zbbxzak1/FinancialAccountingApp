import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardModel} from "../../../../data/models/card/card.model";


@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrl: './styles/card.component.scss'
})
export class CardComponent {
    @Input({required: true}) public card!: CardModel;
    @Output() cardSelected: EventEmitter<CardModel> = new EventEmitter<CardModel>();


    toggleSelection(): void {
        this.cardSelected.emit(this.card);
    }
}
