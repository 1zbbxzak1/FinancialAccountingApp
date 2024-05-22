import { Component, Input, OnInit } from '@angular/core';
import { translations } from '../../../../../../data/directions/category/ctegoryProvider.direction';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./styles/category.component.scss']
})
export class CategoryComponent implements OnInit {

  @Input({ required: true }) category!: string;
  protected _translations = translations;
  protected imageUrl: string = './assets/img/category-default.svg';

  ngOnInit() {
    if(this.category){
      const imageName = this._translations[this.category]?.en;
      if (imageName !== '') {
        this.imageUrl = `assets/img/category-${imageName}.svg`;
      }
      else{
        this.imageUrl = './assets/img/category-default.svg';
      }
    }
  }
}
