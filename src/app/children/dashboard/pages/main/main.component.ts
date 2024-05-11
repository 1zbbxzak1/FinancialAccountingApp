import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Capacitor, CapacitorGlobal} from "@capacitor/core";
import {StateBarService} from "../../services/state-bar/state-bar.service";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['../../styles/dashboard-styles.scss', './styles/main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MainComponent implements OnInit {

    constructor(private stateBarService: StateBarService) { }

    ngOnInit(): void {
        this.stateBarService.toggleState('isHomeClicked');
    }

    protected readonly Capacitor: CapacitorGlobal = Capacitor;
}
