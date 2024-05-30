import { Component, DestroyRef, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { OperationModel } from '../../../../../../data/models/operation/operation.model';
import { OperationAccountingService } from '../../../../services/operation/operation-accounting.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardModel } from '../../../../../../data/models/card/card.model';
import { OperationManagerService } from '../../../../../../data/services/operation/operation.manager.service';
import { BehaviorSubject, Observable, forkJoin, of, switchMap } from 'rxjs';

@Component({
    selector: 'app-card-operation-list',
    templateUrl: './card-operation-list.component.html',
    styleUrl: './styles/card-operation-list.component.scss',
})
export class CardOperationListComponent {
  
    private _card!: CardModel;

    @Input({required: true})

    set card(card: CardModel) {
        this._card = card;
        this.updateOperations();
    }

    get card(): CardModel {
        return this._card;
    }
    
    private _userId:string = localStorage.getItem('uid')!;

    private _expenses: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private _income: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private _economy: BehaviorSubject<number> = new BehaviorSubject<number>(0); 

    protected expenses$: Observable<number> = this._expenses.asObservable();
    protected income$: Observable<number> = this._income.asObservable();
    protected economy$: Observable<number> = this._economy.asObservable(); 

    constructor(
      private _operationAccountingService: OperationAccountingService,
      private _destroyRef: DestroyRef,
      private _operationManagerService: OperationManagerService
    ){}
    
    protected updateOperations(): void {
        this._operationManagerService.getAll(this._userId, this.card.cardId)
        .pipe(
          takeUntilDestroyed(this._destroyRef),
          switchMap((data: OperationModel[]) => {
            if(data.length === 0){
                return of({expenses: 0, income: 0});
            }
            else{
              return forkJoin({
                expenses: this._operationAccountingService.getExpenses(data),
                income: this._operationAccountingService.getIncome(data)
              });
            }
          })
        )
        .subscribe(({expenses, income}) => {
          this._expenses.next(expenses);
          this._income.next(income);
          this._economy.next(this._card.balance + income);
        });
    }
}
