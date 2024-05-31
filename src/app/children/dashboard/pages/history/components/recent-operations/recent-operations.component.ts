import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ViewChild} from "@angular/core";
import {OperationModel} from "../../../../../../data/models/operation/operation.model";
import {CreateOperationComponent} from "../create-operation/create-operation.component";
import {Router} from "@angular/router";
import {CardSelectionService} from "../../../../services/my-cards/card-selection.service";
import {OperationManagerService} from "../../../../../../data/services/operation/operation.manager.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext, TuiDialogSize} from "@taiga-ui/core";
import {NEVER, Observable, switchMap, tap, window} from "rxjs";
import {CardManagerService} from "../../../../../../data/services/card/card.manager.service";
import {CardModel} from "../../../../../../data/models/card/card.model";
import {ICardRequestModel, ToICardRequestModel} from "../../../../../../data/request-models/card/ICard.request-model";

@Component({
    selector: 'app-recent-operations',
    templateUrl: './recent-operations.component.html',
    styleUrl: './styles/recent-operations.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentOperationsComponent {
    protected visibleOperations: OperationModel[] = [];
    protected activeFilter: string = 'all';
    protected readonly window = window;
    @ViewChild(CreateOperationComponent) private readonly _createOperationComponent!: CreateOperationComponent;
    private readonly _uid: string = localStorage.getItem("uid")!;
    private allOperations: OperationModel[] = [];

    constructor(
        private readonly _router: Router,
        private readonly _destroyRef: DestroyRef,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _cardSelectionService: CardSelectionService,
        private readonly _operationManager: OperationManagerService,
        private readonly _cardManager: CardManagerService,
    ) {
        this._cardSelectionService.selectedCardId
            .pipe(
                takeUntilDestroyed(this._destroyRef),
                switchMap((cardId: string | null): Observable<OperationModel[]> =>
                    cardId ? this._operationManager.getAll(this._uid, cardId).pipe(
                        takeUntilDestroyed(this._destroyRef)) : NEVER
                ),
                tap((operations: OperationModel[]): void => {
                    this.allOperations = operations;
                    this.processOperations();
                })
            )
            .subscribe();

        this.initFilter();
    }

    protected setActiveFilter(filter: string): void {
        this.activeFilter = filter;
        this._router.navigate(['/dashboard/history/operations', filter]);
        this.processOperations();
    }

    protected openDialogCreateOperation(
        createOperation: PolymorpheusContent<TuiDialogContext>,
        size: TuiDialogSize,
    ): void {
        this._createOperationComponent.openDialogCreateOperation(createOperation, size);
    }

    protected deleteOperation(operation: OperationModel): void {
        this._operationManager.delete(this._uid, operation.cardId, operation.operationId).pipe(
            takeUntilDestroyed(this._destroyRef),
            switchMap(() => this._cardManager.getById(this._uid, operation.cardId)),
            tap((card: CardModel): void => {
                card.balance -= operation.amount;
            }),
            switchMap((card: CardModel) => {
                const request: ICardRequestModel = ToICardRequestModel(card);
                return this._cardManager.update(this._uid, operation.cardId, request);
            })
        ).subscribe();
    }

    private initFilter(): void {
        const url: string = this._router.url;
        if (url.includes('dashboard/history/operations/all')) {
            this.setActiveFilter('all');
        } else if (url.includes('dashboard/history/operations/income')) {
            this.setActiveFilter('income');
        } else if (url.includes('dashboard/history/operations/expense')) {
            this.setActiveFilter('expense');
        }
    }

    private processOperations(): void {
        if (this.activeFilter === 'all') {
            this.visibleOperations = this.allOperations;
        } else if (this.activeFilter === 'income') {
            this.visibleOperations = this.allOperations.filter((operation: OperationModel): boolean => operation.amount >= 0);
        } else if (this.activeFilter === 'expense') {
            this.visibleOperations = this.allOperations.filter((operation: OperationModel): boolean => operation.amount < 0);
        }

        this.visibleOperations = this.visibleOperations.sort((a: OperationModel, b: OperationModel) => {
            const today: Date = new Date();
            const diffA: number = Math.abs(a.date.getTime() - today.getTime());
            const diffB: number = Math.abs(b.date.getTime() - today.getTime());

            return diffA - diffB;
        });

        this._changeDetectorRef.markForCheck();
    }
}
