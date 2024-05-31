import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef} from '@angular/core';
import Chart from 'chart.js/auto';
import {OperationModel} from "../../../../../../data/models/operation/operation.model";
import {OperationManagerService} from "../../../../../../data/services/operation/operation.manager.service";
import {CardSelectionService} from "../../../../services/my-cards/card-selection.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {CardManagerService} from "../../../../../../data/services/card/card.manager.service";
import {CardModel} from "../../../../../../data/models/card/card.model";
import {Observable, of, switchMap} from "rxjs";

@Component({
    selector: 'app-dynamics',
    templateUrl: './dynamics.component.html',
    styleUrl: './styles/dynamics.master.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicsComponent {
    private readonly _uid: string = localStorage.getItem('uid')!;
    private _balance: number = 0;
    private _chart: Chart | null = null;

    constructor(
        private readonly _cardManagerService: CardManagerService,
        private readonly _operationManagerService: OperationManagerService,
        private readonly _cardSelectionService: CardSelectionService,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _destroyRef: DestroyRef,
    ) {
        this._cardSelectionService.selectedCardId.pipe(
            takeUntilDestroyed(this._destroyRef),
            switchMap((cardId: string | null): Observable<OperationModel[]> => {
                if (cardId) {
                    return this._cardManagerService.getById(this._uid, cardId).pipe(
                        switchMap((card: CardModel): Observable<OperationModel[]> => {
                            this._balance = card.balance;
                            return this._operationManagerService.getAll(this._uid, cardId);
                        })
                    );
                }
                return of<OperationModel[]>([]);
            })
        )
            .subscribe((operations: OperationModel[]): void => {
                this.createLineChart(operations);
                this._changeDetectorRef.detectChanges();
            });
    }

    private createLineChart(operations: OperationModel[]): void {
        const ctx: HTMLCanvasElement = document.getElementById('myLineChart') as HTMLCanvasElement;

        if (!ctx) return;

        if (this._chart) {
            this._chart.destroy();
        }

        operations.sort((a: OperationModel, b: OperationModel) => a.dateTimestamp - b.dateTimestamp);

        const {monthlyData, labels, monthlyAmounts} = this.aggregateMonthlyData(operations);

        const amounts: number[] = Object.values(monthlyData);

        const context: CanvasRenderingContext2D = ctx.getContext('2d')!;
        const gradient: CanvasGradient = context!.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(45, 96, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(45, 96, 255, 0)');

        this._chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Динамика операций',
                    data: amounts,
                    fill: {
                        target: 'origin',
                        above: gradient,
                        below: gradient
                    },
                    tension: 0.4,
                    borderColor: '#1814F3',
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        ticks: {
                            font: {
                                size: 10
                            }
                        }
                    },
                    y: {
                        ticks: {
                            font: {
                                size: 10
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: (context): [string, string, string] => {
                                const index: number = context.dataIndex;
                                const amount: number = monthlyAmounts[index];
                                const spent: number = amount < 0 ? amount : 0;
                                const received: number = amount > 0 ? amount : 0;
                                return [
                                    `Баланс: ${context.raw}`,
                                    `Потрачено: ${spent}`,
                                    `Получено: ${received}`
                                ];
                            }
                        }
                    }
                }
            }
        });
    }

    private aggregateMonthlyData(operations: OperationModel[]): {
        monthlyData: { [key: string]: number },
        labels: string[],
        monthlyAmounts: number[]
    } {
        const initialData = {
            monthlyData: {} as { [key: string]: number },
            labels: [] as string[],
            monthlyAmounts: [] as number[],
            cumulativeSum: this._balance
        };

        const result = operations.reduce((acc, operation: OperationModel) => {
            const monthKey: string = operation.date.toLocaleString('ru-RU', {year: 'numeric', month: 'long'});
            const monthLabel: string = operation.date.toLocaleString('ru-RU', {month: 'long'});

            acc.cumulativeSum += operation.amount;

            if (!acc.monthlyData[monthKey]) {
                acc.monthlyData[monthKey] = acc.cumulativeSum;
                acc.labels.push(monthLabel);
                acc.monthlyAmounts.push(operation.amount);
            } else {
                acc.monthlyData[monthKey] = acc.cumulativeSum;
                acc.monthlyAmounts[acc.monthlyAmounts.length - 1] += operation.amount;
            }

            return acc;
        }, initialData);

        const {monthlyData, labels, monthlyAmounts} = result;
        return {monthlyData, labels, monthlyAmounts};
    }
}
