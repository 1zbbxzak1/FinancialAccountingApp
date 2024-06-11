import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, Input} from '@angular/core';
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {TuiDialogFormService} from "@taiga-ui/kit";
import {TuiDialogContext, TuiDialogService, TuiDialogSize} from "@taiga-ui/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OperationManagerService} from "../../../../../../data/services/operation/operation.manager.service";
import {CardSelectionService} from "../../../../services/my-cards/card-selection.service";
import {OperationValidator} from "../../../../../../validators/operation/operation.validator";
import {IOperationRequestModel} from "../../../../../../data/request-models/operation/IOperation.request-model";
import {CardManagerService} from "../../../../../../data/services/card/card.manager.service";
import {ICardRequestModel, ToICardRequestModel} from "../../../../../../data/request-models/card/ICard.request-model";
import {Observer, switchMap, take, tap} from "rxjs";
import {CardModel} from "../../../../../../data/models/card/card.model";
import {OperationControlValidator} from "../../../../../../validators/operation/operation.control.validator";

interface Category {
    readonly src: string;
    readonly name: string;
}

@Component({
    selector: 'app-create-operation',
    templateUrl: './create-operation.component.html',
    styleUrl: './styles/create-operation.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateOperationComponent {
    @Input() observer?: Observer<never>;
    protected categoryItem: Category | null = null;
    protected open: boolean = false;
    protected readonly categories: readonly Category[] = [
        {name: 'Продукты', src: 'assets/img/category-food.svg'},
        {name: 'Одежда', src: 'assets/img/category-clothes.svg'},
        {name: 'Транспорт', src: 'assets/img/category-transport.svg'},
        {name: 'Личное', src: 'assets/img/category-personal.svg'},
        {name: 'Семья', src: 'assets/img/category-family.svg'},
    ];
    protected formEditOperation: FormGroup = new FormGroup({
        name: new FormControl("", [Validators.required]),
        category: new FormControl("", [Validators.required]),
        amount: new FormControl("", [Validators.required, Validators.pattern(/^-?\d+(\.\d+)?$/)]),
        date: new FormControl("", [Validators.required, this._operationControlValidator.dateValidator]),
    });
    private _uid: string = localStorage.getItem('uid')!;
    private _operationId: string | undefined;
    private readonly _controlValidator: OperationValidator = new OperationValidator(this.formEditOperation);


    constructor(
        private readonly _dialogForm: TuiDialogFormService,
        private readonly _dialogs: TuiDialogService,
        private readonly _destroyRef: DestroyRef,
        private readonly _operationManager: OperationManagerService,
        private readonly _cardManager: CardManagerService,
        private readonly _cardSelectionService: CardSelectionService,
        private readonly _operationControlValidator: OperationControlValidator,
        private readonly _changeDetectorRef: ChangeDetectorRef,
    ) {
        this._changeDetectorRef.markForCheck();
    }

    readonly stringify = ({name}: Category): string => name;

    public openDialogCreateOperation(
        editOperation: PolymorpheusContent<TuiDialogContext>,
        size: TuiDialogSize,
    ): void {

        this._dialogs.open(
            editOperation,
            {
                size,
            })
            .pipe(
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe({
                complete: (): void => {
                    this.formEditOperation.reset();
                    this._dialogForm.markAsPristine();
                },
            });
    }

    protected isControlError(controlName: string): boolean {
        return this._controlValidator.isControlError(controlName);
    }

    protected isControlRequired(controlName: string): boolean {
        return this._controlValidator.isControlRequired(controlName);
    }

    protected isAmountInvalid(controlName: string): boolean {
        return this._controlValidator.isAmountInvalid(controlName);
    }

    protected isDateInvalid(controlName: string): boolean {
        return this._controlValidator.isDateInvalid(controlName);
    }

    protected createOperation(): void {
        const name: string = this.formEditOperation.get('name')?.value;
        const category: string = this.formEditOperation.get('category')?.value.name;
        const amount: number = parseInt(this.formEditOperation.get('amount')?.value);
        const date: string = this.formEditOperation.get('date')?.value;

        const [day, month, year] = date.split('.').map(Number);
        const dateTimestamp: number = new Date(year, month - 1, day).getTime();

        this._cardSelectionService.selectedCardId.pipe(
            takeUntilDestroyed(this._destroyRef),
            take(1),
            switchMap((cardId: string | null) => {
                const operation: IOperationRequestModel = {
                    cardId: cardId!,
                    name: name,
                    category: category,
                    amount: amount,
                    dateTimestamp: dateTimestamp
                };


                return this._operationManager.create(this._uid, operation).pipe(
                    takeUntilDestroyed(this._destroyRef),
                    switchMap(() => this._cardManager.getById(this._uid, operation.cardId)),
                    tap((card: CardModel): void => {
                        card.balance += operation.amount;
                    }),
                    switchMap((card: CardModel) => {
                        const request: ICardRequestModel = ToICardRequestModel(card);
                        if (this.observer) {
                            this._changeDetectorRef.detectChanges();
                            this.observer.complete();
                        }
                        return this._cardManager.update(this._uid, operation.cardId, request);
                    })
                );
            })
        ).subscribe();
    }
}
