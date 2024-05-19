import {ChangeDetectorRef, Component, DestroyRef, HostListener, inject, Input, OnInit} from '@angular/core';
import {CardManagerService} from "../../../../data/services/card/card.manager.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {CardModel} from "../../../../data/models/card/card.model";

@Component({
    selector: 'app-my-cards',
    templateUrl: './my-cards.component.html',
    styleUrl: './styles/my-cards.component.scss'
})
export class MyCardsComponent implements OnInit {

    public itemsCount: number = 2;
    public maxItemsCount: number = 2;

    private readonly _cardManager: CardManagerService = inject(CardManagerService);
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);
    private readonly _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

    private readonly _uid: string = localStorage.getItem('uid')!;
    private _selectedCardId: string | null = localStorage.getItem('selectedCardId');
    protected indexSelectedCard: number = 0;
    protected cards: CardModel[] = [];


    ngOnInit(): void {
        this.updateItemsCount(window.innerWidth);

        this._cardManager.getAll(this._uid)
            .pipe(
                takeUntilDestroyed(this._destroyRef),
            )
            .subscribe((cards: CardModel[]): void => {
                this.cards = cards;

                if (this._selectedCardId) {
                    const selectedCard: CardModel = this.getCardById(this._selectedCardId!);
                    this.setIndex(this._selectedCardId!);
                    this.selectCard(selectedCard);
                } else if (this.cards.length > 0) {
                    this.selectCard(this.cards[0]);
                }
            });
        this._changeDetectorRef.detectChanges();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any): void {
        this.updateItemsCount(event.target.innerWidth);
    }

    updateItemsCount(width: number): void {
        this.itemsCount = width < 600 ? 1 : this.maxItemsCount;
    }

    deselectAllExcept(selectedCard: CardModel): void {
        this.selectCard(selectedCard);
        this.cards.forEach((card: CardModel): void => {
            card.isSelected = card === selectedCard;
        });
    }

    selectCard(selectedCard: CardModel): void {
        selectedCard.isSelected = true;
        localStorage.setItem('selectedCardId', selectedCard.cardId)
    }

    getCardById(cardId: string): CardModel {
        return this.cards.find((card: CardModel): boolean => card.cardId === cardId)!;
    }

    setIndex(cardId: string): void {
        const index: number = this.cards.findIndex((card: CardModel): boolean => card.cardId === cardId);
        this.indexSelectedCard = (index === this.cards.length - 1) ? index - 1 : index;
    }
}
