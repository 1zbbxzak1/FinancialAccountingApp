import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class CardSelectionService {

    private selectedCardIdSource: BehaviorSubject<string | null>  = new BehaviorSubject<string | null>(null);
    public selectedCardId: Observable<string | null> = this.selectedCardIdSource.asObservable();

    setSelectedCardId(cardId: string): void {
        this.selectedCardIdSource.next(cardId);
    }
}
