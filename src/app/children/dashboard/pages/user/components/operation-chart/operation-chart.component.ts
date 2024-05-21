import { Component, Input } from '@angular/core';
import { OperationModel } from '../../../../../../data/models/operation/operation.model';

@Component({
  selector: 'app-operation-chart',
  templateUrl: './operation-chart.component.html',
  styleUrl: './styles/operation-chart.component.scss'
})
export class OperationChartComponent {
  @Input({required:true}) data!: OperationModel[];
}
