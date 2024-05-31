import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef} from '@angular/core';
import {OperationManagerService} from "../../../../../../data/services/operation/operation.manager.service";
import {OperationModel} from "../../../../../../data/models/operation/operation.model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {CardSelectionService} from "../../../../services/my-cards/card-selection.service";
import {Observable, of, switchMap} from "rxjs";
import {categoryMapping} from "../../../../../../data/directions/categories/categories.record";

@Component({
    selector: 'app-last-operations',
    templateUrl: './last-operations.component.html',
    styleUrl: './styles/last-operations.master.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastOperationsComponent {
    protected operations: OperationModel[] = [];
    protected isOperations: boolean = false;
    private readonly _uid: string = localStorage.getItem('uid')!;

    constructor(
        private readonly _operationManagerService: OperationManagerService,
        private readonly _destroyRef: DestroyRef,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _cardSelectionService: CardSelectionService,
    ) {
        this._cardSelectionService.selectedCardId.pipe(
            switchMap((cardId: string | null): Observable<OperationModel[]> => {
                if (cardId) {
                    return this._operationManagerService.getAll(this._uid, cardId);
                } else {
                    return of<OperationModel[]>([]);
                }
            }),
            takeUntilDestroyed(this._destroyRef)
        )
            .subscribe((operations: OperationModel[]): void => {
                if (window.innerWidth <= 1280 || window.innerWidth > 1570) {
                    this.operations = operations.slice(-3);
                } else {
                    this.operations = operations.slice(-10);
                }

                this.isOperations = this.operations.length > 0;
                this._changeDetectorRef.detectChanges();
            });

    }

    protected getImagePath(category: string): string {
        const englishCategory: string = categoryMapping[category];
        return englishCategory
            ? `assets/img/${englishCategory}.svg`
            : '';
    }
}

