import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ElementRef, ViewChild} from '@angular/core';
import {CardSelectionService} from "../../../../services/my-cards/card-selection.service";
import {OperationManagerService} from "../../../../../../data/services/operation/operation.manager.service";
import {OperationModel} from "../../../../../../data/models/operation/operation.model";
import Chart from "chart.js/auto";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {NEVER, Observable, switchMap, tap} from "rxjs";
import {CardManagerService} from "../../../../../../data/services/card/card.manager.service";
import {CardModel} from "../../../../../../data/models/card/card.model";

@Component({
    selector: 'app-balance-chart',
    templateUrl: './balance-chart.component.html',
    styleUrls: ['./styles/balance-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceChartComponent {

    @ViewChild('barCanvas', {static: true}) barCanvas!: ElementRef<HTMLCanvasElement>;
    barChart!: Chart;
    protected isLoading: boolean = true;
    protected labelsMonths: string[] = [];
    protected dataMonths: number[] = [];
    private _countColumns: number = 5;
    private months: string[] = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    private readonly _uid: string = localStorage.getItem('uid')!;

    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _destroyRef: DestroyRef,
        private readonly _cardSelectionService: CardSelectionService,
        private readonly _cardManager: CardManagerService,
        private readonly _operationManager: OperationManagerService,
    ) {
        this._cardSelectionService.selectedCardId
            .pipe(
                takeUntilDestroyed(this._destroyRef),
                switchMap((cardId: string | null): Observable<CardModel> =>
                    cardId ? this._cardManager.getById(this._uid, cardId) : NEVER
                ),
                switchMap((card: CardModel) =>
                    this._operationManager.getAll(this._uid, card.cardId).pipe(
                        tap((operations: OperationModel[]) => {
                            this.processOperations(card, operations);
                        })
                    )
                ),
                tap(() => {
                    this.initChart();
                    this.isLoading = false;
                    this._changeDetectorRef.markForCheck();
                })
            )
            .subscribe();
    }

    private processOperations(card: CardModel, operations: OperationModel[]): void {
        const currentYear: number = new Date().getFullYear();
        let curMonth: number = new Date().getMonth();

        this.dataMonths = new Array(this._countColumns).fill(0);
        this.labelsMonths = new Array(this._countColumns).fill('');

        this.dataMonths[this._countColumns - 1] = card.balance;
        this.labelsMonths[this._countColumns - 1] = this.months[curMonth];

        for (let i: number = this._countColumns - 2; i >= 0; i--) {
            this.dataMonths[i] += this.dataMonths[i + 1];

            operations.forEach((op: OperationModel): void => {
                if (op.date.getMonth() === curMonth && (op.date.getFullYear() == currentYear || op.date.getFullYear() == currentYear - 1)) {
                    this.dataMonths[i] -= op.amount;
                }
            });

            this.labelsMonths[i] = this.months[(curMonth - 1 + 12) % 12];
            curMonth = (curMonth - 1 + 12) % 12;
        }
    }

    private initChart(): void {
        const labels: string[] = this.labelsMonths;
        const data = {
            labels: labels,
            datasets: [{
                label: 'Баланс',
                data: this.dataMonths,
                backgroundColor: [
                    'rgb(223, 226, 234)',
                    'rgb(223, 226, 234)',
                    'rgb(223, 226, 234)',
                    'rgb(223, 226, 234)',
                    'rgb(36,234,218)'
                ],
                hoverBackgroundColor: [
                    'rgb(36,234,218)',
                    'rgb(36,234,218)',
                    'rgb(36,234,218)',
                    'rgb(36,234,218)',
                    'rgb(36,234,218)',
                ],
                borderWidth: 1
            }]
        };

        if (this.barChart) {
            this.barChart.destroy();
        }

        this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                    },
                    y: {
                        display: false,
                        grid: {
                            display: false
                        },
                    },
                }
            },
        });
    }
}


