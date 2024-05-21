import { Injectable } from '@angular/core';
import { OperationModel } from '../../../../data/models/operation/operation.model';
import { Observable, map, of } from 'rxjs';


@Injectable()
export class OperationAccountingService {

  constructor() { }

  public getExpenses(operations: OperationModel[]): Observable<number> {
    return of(operations).pipe(
      map(ops => {
        let expenses = 0;
        for (let i = 0; i < ops.length; i++){
          if(ops[i].amount > 0){
            expenses += ops[i].amount;
          }
        }
        return expenses;
      })
    );
  }


  public getIncome(operations: OperationModel[]): Observable<number> {
    return of(operations).pipe(
      map(ops => {
        let income = 0;
        for (let i = 0; i < ops.length; i++){
          if(ops[i].amount < 0){
            income += ops[i].amount;
          }
        }
        return income;
      })
    );
  }

  public getOperationList(operations: OperationModel[]): Observable<number[][]>{
    return of(operations).pipe(
      map(ops =>{
        let value: number[][] = [[], []]; 

        for(let j=0; j< ops.length; j++){
          if(ops[j].amount < 0){
            value[0].push(ops[j].amount); 
          } else {
            value[1].push(ops[j].amount); 
          }
        }

        return value;
      })
    )
  }

  public getAllDatesOperations(operations: OperationModel[]): Observable<string[]>{
    return of(operations).pipe(
      map(ops =>{
        let dates!: string[];
        for(let i=0; i < ops.length; i++){
          dates.push(ops[i].dateTimestamp ? new Date(ops[i].dateTimestamp).toLocaleDateString() : '');
        }
        return dates;
      })
    )
  }

}
