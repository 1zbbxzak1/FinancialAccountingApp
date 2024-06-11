import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { OperationModel } from '../../../../../../data/models/operation/operation.model';
import { translations } from '../../../../../../data/directions/category/ctegoryProvider.direction';
@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrl: './styles/transaction.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionComponent implements OnInit, AfterViewInit {
    protected date!: string;
    protected _translations = translations;
    protected imageUrl: string = './assets/img/category-default.svg';
    private _transaction!: OperationModel;

    @Input({required: true})

    set transaction(transaction: OperationModel){
        this._transaction = transaction;
        this._showPicture();
    }

    get transaction(): OperationModel{
        return this._transaction;
    }
    
    @ViewChild('amount') amount!: ElementRef;

    public ngAfterViewInit(): void {

      const amountNumber: number = parseFloat(this.amount.nativeElement.innerText);
        if (amountNumber >= 0) {
            this.amount.nativeElement.style.color = 'green'; 
        } 
        else{
            this.amount.nativeElement.style.color = 'red'; 
        }
    }

    public ngOnInit(): void {
        this.date = this._transaction.dateTimestamp ? new Date(this._transaction.dateTimestamp).toLocaleDateString() : '';
    }

    private _showPicture(): void{
        if(this._transaction.category){
            const imageName = this._translations[this._transaction.category]?.en;
            if (imageName !== '') {
              this.imageUrl = `assets/img/category-${imageName}.svg`;
            }
            else{
              this.imageUrl = './assets/img/category-default.svg';
            }
        }
    }
}

