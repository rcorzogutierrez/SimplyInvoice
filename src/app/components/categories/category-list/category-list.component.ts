import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categoryList: Category[];
  constructor(public categoryService: CategoryService) { }
  showMessage: boolean;
  colormsg: string;
  msg: string;

  ngOnInit() {
    this.categoryService.getCategories().snapshotChanges().subscribe(item =>{
      this.categoryList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.categoryList.push(x as Category);
      });
    });
  }

  
  getTest(){
    return 'pinga'};

  onEdit(category: Category){    
    this.categoryService.selectedCategory = Object.assign({},category);
  }

  onDelete($key: string){
    this.categoryService.deleteCategory($key);
    this.showMessage = true;
    setTimeout(() => this.showMessage = false, 3000);
    this.colormsg = 'danger';
    this.msg='Deleted';
    
  }

}
