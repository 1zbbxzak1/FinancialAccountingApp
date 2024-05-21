import {ChangeDetectionStrategy, Component, DestroyRef, Input} from '@angular/core';
import {tuiCeil} from '@taiga-ui/cdk';
import { OperationModel } from '../../../../../../data/models/operation/operation.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OperationAccountingService } from '../../../../services/operation/operation-accounting.service';
import { switchMap } from 'rxjs';
 
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
    this.updateChart();
  }
  get data(): OperationModel[] {
    return this._operations;
  }

  protected values!:number[][];

  protected labelsX:string[] = [];
  readonly labelsY = ['0', '100 000'];

  constructor(
    private _operationAccountingService: OperationAccountingService,
    private _destroyRef: DestroyRef,
  ){}

  updateChart(): void {
    this._operationAccountingService.getOperationList(this.data)
    .pipe(takeUntilDestroyed(this._destroyRef),
    switchMap((data:number[][])=>{
      this.values = data
      return this._operationAccountingService.getAllDatesOperations(this.data);
    }))
    .subscribe((data:string[])=>{
      this.labelsX = data;
    })
  }

  getHeight(max: number): number {
      return (max / tuiCeil(max, -3)) * 100;
  }
}
