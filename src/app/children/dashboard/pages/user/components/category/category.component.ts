import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { translations } from '../../../../../../data/directions/category/ctegoryProvider.direction';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./styles/category.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent{
    protected _translations = translations;
    protected imageUrl: string = './assets/img/category-default.svg';
    private _category!: string

    @Input({ required: true }) 

    set category(category: string){
        this._category = category;
        this._showPicture();
    }

    get category():string{
        return this._category;
    }

    private _showPicture(): void{
        if(this.category){
            const imageName: string = this._translations[this.category]?.en;
            if (imageName !== '') {
              this.imageUrl = `assets/img/category-${imageName}.svg`;
            }
            else{
              this.imageUrl = './assets/img/category-default.svg';
            }
        }
    }
}
