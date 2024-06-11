import {ChangeDetectionStrategy, Component, DestroyRef, Input} from '@angular/core';
import {tuiCeil} from '@taiga-ui/cdk';
import { OperationModel } from '../../../../../../data/models/operation/operation.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OperationAccountingService } from '../../../../services/operation/operation-accounting.service';
import { forkJoin, switchMap } from 'rxjs';
 
@Component({
    selector: 'app-operation-chart',
    templateUrl: './operation-chart.component.html',
    styleUrl: './styles/operation-chart.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OperationChartComponent {

    private _operations!: OperationModel[];
    
    @Input({required:true}) 

    set data(data: OperationModel[]){
        this._operations = data;
        this._updateChart();
    }

    get data(): OperationModel[] {
        return this._operations;
    }

    protected values!: number[][];
    protected labelsX: string[] = [];
    protected labelsY: string[] = [];

    constructor(
      private _operationAccountingService: OperationAccountingService,
      private _destroyRef: DestroyRef,
    ){}

    private _updateChart(): void {
      this._operationAccountingService.getOperationList(this.data)
      .pipe(
          takeUntilDestroyed(this._destroyRef),
          switchMap((value: number[][]) => {
              this.values = value;
              console.log(this.values);
              return forkJoin({
                  labelsX: this._operationAccountingService.getAllDatesOperations(this.data),
                  labelsY: this._operationAccountingService.getMaxAmmount(this.data)
              });
          })
      )
      .subscribe(({labelsX, labelsY}) => {
          let amountList: string[] = ['0'];
          amountList.push(labelsY);
          this.labelsX = labelsX;
          this.labelsY = amountList;
        });
    }

    protected getHeight(max: number): number {
        return (max / tuiCeil(max, -3)) * 100;
    }
}
