import {ChangeDetectorRef, Component, DestroyRef} from '@angular/core';
import {Observable, of, switchMap} from "rxjs";
import {OperationManagerService} from "../../../../../../data/services/operation/operation.manager.service";
import {OperationModel} from "../../../../../../data/models/operation/operation.model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import Chart from "chart.js/auto";
import {CardSelectionService} from "../../../../services/my-cards/card-selection.service";

@Component({
    selector: 'app-statistics-cards',
    templateUrl: './statistics-cards.component.html',
    styleUrl: './styles/statistics-cards.master.scss'
})
export class StatisticsCardsComponent {
    protected isNullOperations: boolean = true;
    private readonly _uid: string = localStorage.getItem('uid')!;
    private _chart: Chart<'doughnut', number[], string> | null = null;

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
                    return this._operationManagerService.getAll(this._uid, cardId);
                }
                return of<OperationModel[]>([]);
            })
        )
            .subscribe((operations: OperationModel[]): void => {
                this.createDoughnutChart(operations);
                this._changeDetectorRef.detectChanges();
            });
    }

    private createDoughnutChart(operations: OperationModel[]): void {
        const ctx: HTMLCanvasElement = document.getElementById('myPieChart') as HTMLCanvasElement;
        if (!ctx) return;

        if (this._chart) {
            this._chart.destroy();
        }

        operations.sort((a: OperationModel, b: OperationModel) => a.dateTimestamp - b.dateTimestamp);

        const {
            labels,
            expenditurePercentages,
            totalExpenditures
        } = this.aggregateCategoryExpendituresForLastDayOfMonth(operations);

        if (operations.length === 0 || labels.length === 0) {
            this.isNullOperations;
        } else {
            !this.isNullOperations;
        }

        this._chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Расходы',
                    data: expenditurePercentages,
                    backgroundColor: [
                        'rgba(255,99,132,0.3)',
                        'rgba(54, 162, 235, 0.3)',
                        'rgba(255, 206, 86, 0.3)',
                        'rgba(75, 192, 192, 0.3)',
                        'rgba(153, 102, 255, 0.3)',
                        'rgba(255, 159, 64, 0.3)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        align: 'center',
                        labels: {
                            boxWidth: 20,
                            boxHeight: 20,
                            usePointStyle: true,
                            font: {
                                size: 14,
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context): string {
                                const label: string = context.label || '';
                                const value: string = context.formattedValue;
                                const totalExpenditure: number = totalExpenditures[context.dataIndex];
                                return label + ': ' + value + '%' + ' (' + totalExpenditure + ' ₽' + ')';
                            }
                        }
                    }
                }
            }
        });
    }

    private getOperationsForLastDayOfMonth(operations: OperationModel[]): OperationModel[] {
        const currentDate: Date = new Date();
        const lastDayOfMonth: Date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        return operations.filter((operation: OperationModel) => {
            const operationDate: Date = new Date(operation.dateTimestamp);
            return operationDate.getDate() === lastDayOfMonth.getDate() &&
                operationDate.getMonth() === lastDayOfMonth.getMonth() &&
                operationDate.getFullYear() === lastDayOfMonth.getFullYear();
        });
    }

    private aggregateCategoryExpendituresForLastDayOfMonth(operations: OperationModel[]): {
        labels: string[],
        expenditurePercentages: number[],
        totalExpenditures: number[]
    } {
        const filteredOperations: OperationModel[] = this.getOperationsForLastDayOfMonth(operations);

        const categoryExpendituresMap: Map<string, number> = filteredOperations.reduce(
            (acc: Map<string, number>, operation: OperationModel) => {
                if (operation.category && operation.amount < 0) {
                    const category: string = operation.category;
                    const expenditure: number = Math.abs(operation.amount);

                    if (!acc.has(category)) {
                        acc.set(category, expenditure);
                    } else {
                        acc.set(category, acc.get(category)! + expenditure);
                    }
                }
                return acc;
            }, new Map<string, number>());

        const totalExpenditure: number = Array.from(categoryExpendituresMap.values()).reduce(
            (acc: number, expenditure: number) => acc + expenditure, 0
        );

        const {
            labels,
            expenditurePercentages,
            totalExpenditures
        } = Array.from(categoryExpendituresMap.entries()).reduce((acc, [category, expenditure]) => {
            acc.labels.push(category);
            acc.expenditurePercentages.push(Math.round((expenditure / totalExpenditure) * 1000) / 10);
            acc.totalExpenditures.push(expenditure);
            return acc;
        }, {labels: [] as string[], expenditurePercentages: [] as number[], totalExpenditures: [] as number[]});

        return {labels, expenditurePercentages, totalExpenditures};
    }
}
