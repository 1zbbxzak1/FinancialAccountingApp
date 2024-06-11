import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    inject,
    Input,
    Output
} from '@angular/core';
import {CardModel} from "../../../../data/models/card/card.model";


@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrl: './styles/card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
    @Input({required: true}) public card!: CardModel;
    @Output() cardSelected: EventEmitter<CardModel> = new EventEmitter<CardModel>();
    private readonly _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

    protected toggleSelection(): void {
        this.cardSelected.emit(this.card);
    }

    public markForCheck(): void {
        this._changeDetectorRef.markForCheck();
    }
}
