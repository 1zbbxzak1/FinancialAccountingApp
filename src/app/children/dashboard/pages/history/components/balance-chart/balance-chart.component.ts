import {Component, inject, OnInit} from '@angular/core';
import {TuiContextWithImplicit} from "@taiga-ui/cdk";
import {tuiFormatNumber} from "@taiga-ui/core";
import {OperationManagerService} from "../../../../../../data/services/operation/operation.manager.service";
import {OperationModel} from "../../../../../../data/models/operation/operation.model";

@Component({
  selector: 'app-balance-chart',
  templateUrl: './balance-chart.component.html',
  styleUrl: './styles/balance-chart.component.scss'
})
export class BalanceChartComponent implements OnInit {

    private readonly _uid: string = localStorage.getItem('uid')!;
    private readonly _selectedCardId: string | null = localStorage.getItem('selectedCardId');
    private readonly _operationManager: OperationManagerService = inject(OperationManagerService);

    ngOnInit(): void {
        if(this._selectedCardId) {
            this._operationManager.getAll(this._uid, this._selectedCardId).subscribe(
                (operations: OperationModel[]) => {

                }
            )
        }
    }


    readonly value: number[][] = [
        [1000, 8000, 4000, 3000, 4000],
    ];

    readonly labelsX: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    readonly labelsY: string[] = ['0', '10 000'];

    protected appearance: string = 'onDark';

    readonly hint = ({$implicit}: TuiContextWithImplicit<number>): string =>
        this.value
            .reduce((result: string, set: number[]): string => `${result}₽${tuiFormatNumber(set[$implicit])}\n`, '')
            .trim();
}
