import {Component, DestroyRef, OnInit} from '@angular/core';
import {OperationManagerService} from "../../../../../../data/services/operation/operation.manager.service";
import {OperationModel} from "../../../../../../data/models/operation/operation.model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-last-operations',
    templateUrl: './last-operations.component.html',
    styleUrl: './styles/last-operations.master.scss'
})
export class LastOperationsComponent implements OnInit {
    protected operations: OperationModel[] = [];
    protected isOperations: boolean = false;
    private readonly _uid: string = localStorage.getItem('uid')!;
    private readonly _cardId: string = localStorage.getItem('selectedCardId')!;

    private categoryMapping: { [key: string]: string } = {
        'Продукты': 'food',
        'Одежда': 'clothes',
        'Транспорт': 'transport',
        'Личное': 'personal',
        'Семья': 'family',
    };

    constructor(
        private readonly _operationManagerService: OperationManagerService,
        private readonly _destroyRef: DestroyRef,
    ) {
    }

    ngOnInit(): void {
        this._operationManagerService.getAll(this._uid, this._cardId).pipe(
            takeUntilDestroyed(this._destroyRef)
        ).subscribe((operations: OperationModel[]): void => {
            this.operations = operations.slice(-3);
            this.isOperations = this.operations.length > 0;
        });
    }

    protected getImagePath(category: string): string {
        const englishCategory: string = this.categoryMapping[category];
        return englishCategory
            ? `assets/img/children/dashboard/components/last-operations/categories/${englishCategory}.svg`
            : '';
    }
}
