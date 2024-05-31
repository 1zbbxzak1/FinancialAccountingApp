import {ChangeDetectorRef, Component, DestroyRef} from '@angular/core';
import Chart from "chart.js/auto";
import {OperationManagerService} from "../../../../../../data/services/operation/operation.manager.service";
import {CardSelectionService} from "../../../../services/my-cards/card-selection.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {map, Observable, of, switchMap} from "rxjs";
import {OperationModel} from "../../../../../../data/models/operation/operation.model";

@Component({
    selector: 'app-weekly-activity',
    templateUrl: './weekly-activity.component.html',
    styleUrl: './styles/weekly-activity.master.scss'
})
export class WeeklyActivityComponent {
    private readonly _uid: string = localStorage.getItem('uid')!;
    private _chart: Chart | null = null;

    constructor(
        private readonly _operationManagerService: OperationManagerService,
        private readonly _cardSelectionService: CardSelectionService,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _destroyRef: DestroyRef,
    ) {
        this._cardSelectionService.selectedCardId.pipe(
            takeUntilDestroyed(this._destroyRef),
            switchMap((cardId: string | null): Observable<OperationModel[]> => {
                if (cardId) {
                    return this._operationManagerService.getAll(this._uid, cardId).pipe(
                        map((operations: OperationModel[]) => operations)
                    );
                }

                return of<OperationModel[]>([null as unknown as OperationModel]);
            })
        )
            .subscribe((operations: OperationModel[]): void => {
                this.createBarChart(operations);
                this._changeDetectorRef.detectChanges();
            });
    }

    private createBarChart(operations: OperationModel[]): void {
        const ctx: HTMLCanvasElement = document.getElementById('myBarChart') as HTMLCanvasElement;
        if (!ctx) return;

        if (this._chart) {
            this._chart.destroy();
        }

        operations.sort((a: OperationModel, b: OperationModel) => a.dateTimestamp - b.dateTimestamp);

        const {labels, incomeAmounts, expenditureAmounts} = this.aggregateDailyData(operations);

        this._chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Зачисления',
                    data: incomeAmounts,
                    backgroundColor: 'rgba(255, 130, 172, 1)',
                    borderWidth: 2,
                    borderRadius: 50,
                    barPercentage: 0.35,
                }, {
                    label: 'Расходы',
                    data: expenditureAmounts,
                    backgroundColor: 'rgba(22, 219, 204, 1)',
                    borderWidth: 2,
                    borderRadius: 50,
                    barPercentage: 0.35,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        ticks: {
                            font: {
                                size: 9
                            }
                        },
                        grid: {
                            display: false,
                        }
                    },
                    y: {
                        ticks: {
                            font: {
                                size: 9
                            }
                        },
                        grid: {
                            color: '#f3f3f5'
                        },
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        align: 'end',
                        labels: {
                            boxWidth: 8,
                            boxHeight: 8,
                            usePointStyle: true,
                            font: {
                                size: 14,
                            }
                        }
                    },
                }
            }
        });
    }

    private aggregateDailyData(operations: OperationModel[]): {
        labels: string[],
        incomeAmounts: number[],
        expenditureAmounts: number[]
    } {
        const initialData = {
            labels: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
            incomeAmounts: [0, 0, 0, 0, 0, 0, 0],
            expenditureAmounts: [0, 0, 0, 0, 0, 0, 0]
        };

        const getDayOfWeek = (date: Date): number => {
            const day: number = date.getDay();
            return day === 0 ? 6 : day - 1;
        };

        const isWithinLastWeek = (date: Date): boolean => {
            const today: Date = new Date();
            const oneWeekAgo: Date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
            return date >= oneWeekAgo && date <= today;
        };

        const lastWeekOperations: OperationModel[] = operations.filter((operation: OperationModel) => isWithinLastWeek(operation.date));

        const result = lastWeekOperations.reduce((acc, operation: OperationModel) => {
            const dayIndex: number = getDayOfWeek(operation.date);

            if (operation.amount > 0) {
                acc.incomeAmounts[dayIndex] += operation.amount;
            } else {
                const expenditure: number = operation.amount * -1;
                acc.expenditureAmounts[dayIndex] += expenditure;
            }

            return acc;
        }, initialData);

        const {labels, incomeAmounts, expenditureAmounts} = result;
        return {labels, incomeAmounts, expenditureAmounts};
    }
}
