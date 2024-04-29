import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrls: ['../../styles/dashboard-styles.scss', './styles/cards.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent {

}
