import {ChangeDetectorRef, Component, DestroyRef, inject, Input, OnInit} from '@angular/core';
import {CardManagerService} from "../../../../data/services/card/card.manager.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {CardModel} from "../../../../data/models/card/card.model";

@Component({
    selector: 'app-my-cards',
    templateUrl: './my-cards.component.html',
    styleUrl: './styles/my-cards.component.scss'
})
export class MyCardsComponent implements OnInit {

    @Input() public itemsCount: number = 2;

    private readonly _cardManager: CardManagerService = inject(CardManagerService);
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);

    private readonly _uid: string = localStorage.getItem('uid')!;
    protected cards: CardModel[] = [];


    ngOnInit(): void {

        this._cardManager.getAll(this._uid)
            .pipe(
                takeUntilDestroyed(this._destroyRef),
            )
            .subscribe((cards: CardModel[]): void => {
                this.cards = cards;
                if (this.cards.length > 0) {
                    this.cards[0].isSelected = true;
                }
            });
    }

    deselectAllExcept(selectedCard: CardModel): void {
        this.cards.forEach((card: CardModel): void => {
            card.isSelected = card === selectedCard;
        });
    }
}
