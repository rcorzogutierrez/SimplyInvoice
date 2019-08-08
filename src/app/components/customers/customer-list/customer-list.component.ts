import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../models/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customerList: Customer[];
  constructor(public customerService: CustomerService) { }

  showMessage: boolean;
  colormsg: string;
  msg: string;

  ngOnInit() {
    this.customerService.getCustomers().snapshotChanges().subscribe(item => {
      this.customerList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.customerList.push(x as Customer);
      });
    });
  }

  onEdit(customer: Customer){    
    this.customerService.selectedCustomer = Object.assign({},customer);    
  }  

  onDelete($key: string){
    this.customerService.deleteCustomer($key);
    this.showMessage = true;
    setTimeout(() => this.showMessage = false, 3000);
    this.colormsg = 'danger';
    this.msg='Deleted';
  }

}
