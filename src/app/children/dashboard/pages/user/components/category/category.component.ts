import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './styles/category.component.scss'
})
export class CategoryComponent {
  @Input({required: true}) category!: string; 
}
