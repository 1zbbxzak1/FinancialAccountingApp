import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Capacitor, CapacitorGlobal} from "@capacitor/core";
import {CardModel} from "../../../../data/models/card/card.model";

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrl: './styles/history.master.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent {

    protected readonly Capacitor: CapacitorGlobal = Capacitor;
    protected readonly window: Window = window;

    protected readonly myCard: CardModel = new CardModel({balance: 123, dateCreatedTimestamp: 214346436, name: "124", provider: "visa" }, '215')
}
