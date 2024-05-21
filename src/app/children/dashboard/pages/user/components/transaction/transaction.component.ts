import { Component, Input } from '@angular/core';
import { OperationModel } from '../../../../../../data/models/operation/operation.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './styles/transaction.component.scss'
})
export class TransactionComponent {
  @Input({required: true}) public transaction!: OperationModel;
}
