import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    HostListener,
    inject, QueryList, ViewChildren,
} from '@angular/core';
import {CardManagerService} from "../../../../data/services/card/card.manager.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {CardModel} from "../../../../data/models/card/card.model";
import {CardSelectionService} from "../../services/my-cards/card-selection.service";
import {CardComponent} from "../card/card.component";

@Component({
    selector: 'app-my-cards',
    templateUrl: './my-cards.component.html',
    styleUrl: './styles/my-cards.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyCardsComponent {

    public itemsCount: number = 2;
    public maxItemsCount: number = 2;
    protected indexSelectedCard: number = 0;
    protected cards: CardModel[] = [];
    private readonly _cardManager: CardManagerService = inject(CardManagerService);
    private readonly _cardSelectionService: CardSelectionService  = inject(CardSelectionService);
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);
    private readonly _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
    @ViewChildren(CardComponent) private _cardComponents!: QueryList<CardComponent>;
    private readonly _uid: string = localStorage.getItem('uid')!;
    private _selectedCardId: string | null = localStorage.getItem('selectedCardId');

    constructor() {
        this.updateItemsCount(window.innerWidth);

        this._cardSelectionService.selectedCardId
            .pipe(
                takeUntilDestroyed(this._destroyRef),
            ).subscribe(
            (cardId: string | null): void => {
                this._selectedCardId = cardId;
            }
        );

        this._cardManager.getAll(this._uid)
            .pipe(
                takeUntilDestroyed(this._destroyRef),
            )
            .subscribe((cards: CardModel[]): void => {
                this.cards = cards;

                if (this._selectedCardId) {
                    const selectedCard: CardModel = this.getCardById(this._selectedCardId);
                    this.setIndex(this._selectedCardId);
                    this.selectCard(selectedCard);
                } else if (this.cards.length > 0) {
                    this.selectCard(this.cards[0]);
                }

                this._changeDetectorRef.markForCheck();
            });
    }

    @HostListener('window:resize', ['$event'])
    private onResize(event: any): void {
        this.updateItemsCount(event.target.innerWidth);
    }

    private updateItemsCount(width: number): void {
        this.itemsCount = width < 600 ? 1 : this.maxItemsCount;
    }

    protected deselectAllExcept(selectedCard: CardModel): void {
        this.selectCard(selectedCard);
        this.cards.forEach((card: CardModel): void => {
            card.isSelected = card === selectedCard;
        });

        this._cardComponents.forEach(
            (cardComponent: CardComponent) => cardComponent.markForCheck()
        );
    }

    private selectCard(selectedCard: CardModel): void {
        selectedCard.isSelected = true;
        this._cardSelectionService.setSelectedCardId(selectedCard.cardId);
    }

    private getCardById(cardId: string): CardModel {
        return this.cards.find((card: CardModel): boolean => card.cardId === cardId)!;
    }

    private setIndex(cardId: string): void {
        const index: number = this.cards.findIndex((card: CardModel): boolean => card.cardId === cardId);
        this.indexSelectedCard = (this.itemsCount > 1 && index === this.cards.length - 1) ? index - 1 : index;
    }
}
