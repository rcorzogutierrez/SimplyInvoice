import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  productList: Product[];
  constructor(private productService: ProductService) { }

  showMessage: boolean;
  colormsg: string;
  msg: string;

  ngOnInit() {
    this.productService.getProducts().snapshotChanges().subscribe(item =>{
      this.productList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.productList.push(x as Product);
      });
    });  
  }

  onEdit(product: Product){    
    this.productService.selectedProduct = Object.assign({},product);
    this.productService.getValueBtn(0);    
  }

  onDelete($key: string){     
    this.productService.deleteProduct($key);
    this.showMessage = true;
    setTimeout(() => this.showMessage = false, 3000);
    this.colormsg = 'danger';
    this.msg='Deleted';   
  }

}
