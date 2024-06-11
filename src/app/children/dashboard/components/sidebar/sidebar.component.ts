import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {StateBarService} from "../../services/state-bar/state-bar.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './styles/sidebar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent extends StateBarService implements OnInit {
    protected isSidebarVisible: boolean = false;

    @HostListener('window:resize', ['$event'])
    public onResize(): void {
        this.checkWidth();
    }

    ngOnInit(): void {
        this.checkWidth();
    }

    private checkWidth(): void {
        this.isSidebarVisible = window.innerWidth > 1200;
    }
}
