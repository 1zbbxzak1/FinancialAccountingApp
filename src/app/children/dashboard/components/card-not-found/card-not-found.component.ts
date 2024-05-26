import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-card-not-found',
  templateUrl: './card-not-found.component.html',
  styleUrl: './styles/card-not-found.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardNotFoundComponent {
    private readonly _router: Router = inject(Router);

    protected toCardsPage(): void {
        this._router.navigate(['/dashboard/cards']);
    }
}
