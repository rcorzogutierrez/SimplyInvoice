import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../../services/customer.service';
import { NgForm } from '@angular/forms';
import { Customer } from '../../../models/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerList: Customer[];
  constructor(public customerService: CustomerService) { }
  showMessage: boolean;
  colormsg: string;
  msg: string;
  

  ngOnInit() {
    this.resetForm();

   this.customerService.getCustomers().snapshotChanges().subscribe(item =>{
      this.customerList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.customerList.push(x as Customer);
      });
    });
  }

  onSubmit(customerForm: NgForm){
    if(customerForm.value.$key == null)
      this.colormsg = 'success',
      this.msg='Submit',
      this.customerService.insertCustomer(customerForm.value)
                               
    else
      this.customerService.updateCustomer(customerForm.value),
      this.colormsg = 'info',
      this.msg='Update'     
    this.resetForm(customerForm);
    this.showMessage = true;
    setTimeout(() => this.showMessage = false, 3000);      
     
  }

  resetForm(customerForm?: NgForm)
  {
    if(customerForm != null)
      customerForm.reset();
      this.customerService.selectedCustomer= new Customer();
      
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

}
