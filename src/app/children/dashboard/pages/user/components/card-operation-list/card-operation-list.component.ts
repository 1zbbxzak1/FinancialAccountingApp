import { Component, Input } from '@angular/core';
import { OperationModel } from '../../../../../../data/models/operation/operation.model';

@Component({
  selector: 'app-card-operation-list',
  templateUrl: './card-operation-list.component.html',
  styleUrl: './styles/card-operation-list.component.scss'
})
export class CardOperationListComponent {
  @Input({required: true}) 
  // expenses!: number;
  // income!: number;
  operations!: OperationModel[];
}
