import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {Capacitor, CapacitorGlobal} from "@capacitor/core";
import {CardModel} from "../../../../data/models/card/card.model";

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrl: './styles/history.master.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent implements OnInit {

    protected readonly Capacitor: CapacitorGlobal = Capacitor;
    protected readonly window: Window = window;
    private readonly _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);


    ngOnInit(): void {
        this._changeDetectorRef.detectChanges();
    }
}
