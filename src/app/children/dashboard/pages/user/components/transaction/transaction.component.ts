import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { OperationModel } from '../../../../../../data/models/operation/operation.model';
import { translations } from '../../../../../../data/directions/category/ctegoryProvider.direction';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './styles/transaction.component.scss'
})
export class TransactionComponent implements OnInit, AfterViewInit{
  protected date!: string;
  protected _translations = translations;
  protected imageUrl: string = './assets/img/category-default.svg';


  @Input({required: true}) public transaction!: OperationModel;
  
  @ViewChild('amount') amount!: ElementRef;

  public ngOnInit(): void{
    this.date = this.transaction.dateTimestamp ? new Date(this.transaction.dateTimestamp).toLocaleDateString() : ''; 
  }

  ngAfterViewInit() {
    const amountNumber = parseFloat(this.amount.nativeElement.innerText);

    if (amountNumber >= 0) {
      this.amount.nativeElement.style.color = 'green'; 
    } 
    else{
      this.amount.nativeElement.style.color = 'red'; 
    }

    if(this.transaction.category){
      const imageName = this._translations[this.transaction.category]?.en;
      if (imageName !== '') {
        this.imageUrl = `assets/img/category-${imageName}.svg`;
      }
      else{
        this.imageUrl = './assets/img/category-default.svg';
      }
    }
  }
}

