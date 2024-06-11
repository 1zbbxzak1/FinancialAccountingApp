import {Component, DestroyRef, Inject} from '@angular/core';
import {CardManagerService} from "../../../../../../data/services/card/card.manager.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiAlertService, TuiNotification, TuiNotificationT} from "@taiga-ui/core";
import {ICardRequestModel} from "../../../../../../data/request-models/card/ICard.request-model";
import {cardProvider} from "../../../../../../data/directions/card/cardProvider.direction";

@Component({
    selector: 'app-add-card',
    templateUrl: './add-card.component.html',
    styleUrls: ['./styles/add-card.master.scss']
})
export class AddCardComponent {
    protected formCard: FormGroup = new FormGroup({
        balance: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        date: new FormControl('', [Validators.required]),
        provider: new FormControl('', Validators.required),
    });

    protected providers: cardProvider[] = ["mir", "mastercard", "visa"];
    private readonly _uid: string = localStorage.getItem('uid')!;

    constructor(
        private readonly _destroyRef: DestroyRef,
        private readonly _cardManagerService: CardManagerService,
        @Inject(TuiAlertService)
        private readonly _alerts: TuiAlertService,
    ) {
    }

    showNotification(data: string, label: string, status: TuiNotification | TuiNotificationT | undefined): void {
        this._alerts
            .open(data, {label, status: status})
            .subscribe();
    }

    protected stringify = (item: cardProvider) => item;

    protected onSubmit(): void {
        if (this.formCard.valid) {
            const formValue = this.formCard.value;
            const date: string = this.formCard.get('date')?.value;

            const [day, month, year] = date.split('.').map(Number);
            const dateTimestamp: number = new Date(year, month - 1, day).getTime();

            const cardData: ICardRequestModel = {
                ...formValue,
                dateCreatedTimestamp: dateTimestamp
            };

            this._cardManagerService.create(this._uid, cardData).pipe(
                takeUntilDestroyed(this._destroyRef)
            ).subscribe({
                next: (): void => {
                    this.formCard.reset();
                    this.showNotification("Карта успешно создалась", "Успех", 'success');
                },
                error: (): void => {
                    this.showNotification("Не удалось создать карту", "Ошибка", 'warning');
                }
            });
        }
    }
}
