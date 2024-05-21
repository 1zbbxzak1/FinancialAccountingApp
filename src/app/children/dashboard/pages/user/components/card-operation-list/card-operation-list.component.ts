import { Component, DestroyRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { OperationModel } from '../../../../../../data/models/operation/operation.model';
import { OperationAccountingService } from '../../../../services/operation/operation-accounting.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardModel } from '../../../../../../data/models/card/card.model';
import { OperationManagerService } from '../../../../../../data/services/operation/operation.manager.service';
import { forkJoin, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-card-operation-list',
  templateUrl: './card-operation-list.component.html',
  styleUrl: './styles/card-operation-list.component.scss',
})
export class CardOperationListComponent{
  
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
  protected operations:OperationModel[] = [
    new OperationModel({
      cardId: '',
      name: 'no operations',
      category: '',
      amount: 0,
      dateTimestamp: 0
    }, '')];

  protected expenses!:number;
  protected income!: number;

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
          this.operations = [
            new OperationModel({
              cardId: '',
              name: 'no operations',
              category: '',
              amount: 0,
              dateTimestamp: 0
            }, '')];
            return of({expenses: 0, income: 0});
        }
        else{
          this.operations = data;
          return forkJoin({
            expenses: this._operationAccountingService.getExpenses(this.operations),
            income: this._operationAccountingService.getIncome(this.operations)
          });
        }
      })
    )
    .subscribe(({expenses, income}) => {
      this.expenses = expenses;
      this.income = income;
    });
  }
}
