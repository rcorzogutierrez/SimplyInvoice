import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';

import { InvoiceService } from '../../../services/invoice.service';
import { PagerService } from '../../../services/pager.service';
import { ProductService } from '../../../services/product.service';
import { CustomerService } from '../../../services/customer.service';

import { IInvoice } from '../../../models/invoice';
import { ICustomer } from '../../../models/customer';
import { IProduct } from '../../../models/product';


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  constructor(private invoiceService: InvoiceService, private _fb: FormBuilder, private pagerService: PagerService, private customerService: CustomerService, private productService: ProductService) { }

  productList: IProduct[];
  invoiceList: any[];
  form: FormGroup;
  customerList: ICustomer[];
  productData: any;
  customerSelected: Number;
  showUpdatedMessage: boolean;
  color: string;
  msg: string;

  searchText: string = "";

  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  ngOnInit() {
    this.customerService.getCustomers().snapshotChanges().subscribe(data => {
      this.customerList = data.map(item => <ICustomer>item.payload.toJSON());
    });

    this.invoiceService.getInvoices().snapshotChanges().pipe(
      map(data => data.map(datum => {
        let purchases = datum.payload.toJSON()['purchases'];
        return {
          ...datum.payload.toJSON() as IInvoice,
          $key: datum.key,
          purchases: Object.keys(purchases).map(key => purchases[key])
        }
      })))
      .subscribe(data => {
        this.invoiceList = data;
        this.setPage(1);
      });
    this.productService.getProducts().snapshotChanges().subscribe(data => {
      this.productList = data.map(item => <IProduct>item.payload.toJSON());
    });
    this.updateForm()
    // initialize stream
    const myFormValueChanges$ = this.form.controls['purchases'].valueChanges;
    // subscribe to the stream
    myFormValueChanges$.subscribe(purchases => this.updatePurchasesAmount(purchases));
  }

  updateForm(): void {
    this.form = this._fb.group({
      $key: '',
      customer: [null, Validators.required],
      totalPrice: 0,
      purchases: this._fb.array([])
    });
  }

  public resetPurchase(): void {
    this.form.controls['totalPrice'].setValue(0);
    const control = <FormArray>this.form.controls['purchases'];
    control.controls = [];
  }

  public removePurchase(i: number): void {
    const control = <FormArray>this.form.controls['purchases'];
    control.removeAt(i);
  }

  updatePurchasesAmount(purchases: any) {
    const control = <FormArray>this.form.controls['purchases'];
    let totalSum = 0;
    for (let i in purchases) {
      const amount = (purchases[i].quantity * purchases[i].product.price);
      control.at(+i).get('amount').setValue(amount, { onlySelf: true, emitEvent: false });
      // update total price
      totalSum += amount;
    }
    this.form.get('totalPrice').setValue(totalSum);
    if (totalSum <= 0) { alert("the total can't be 0") }
  }

  purchaseForm(product?: IProduct): FormGroup {
    const numberPatern = '^[0-9.,]+$';
    return this._fb.group({
      product: [product, Validators.required],
      quantity: [1, [Validators.required, Validators.pattern(numberPatern)]],
      amount: [{ value: 0, disabled: true }],
    }
    );
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.name === c2.name : c1 === c2;
  }

  onUpdate(invoice) {
    const control = <FormArray>this.form.controls['purchases'];
    control.controls = [];
    this.form.controls['$key'].setValue(invoice.$key);
    this.form.controls['customer'].setValue(invoice.customer);
    for (let i in invoice.purchases) {
      const product = (invoice.purchases[i].product);
      const quantity = (invoice.purchases[i].quantity);
      this.addPurchase(product);
      control.at(+i).get('quantity').setValue(quantity);
    }
  }

  onDelete($key: string) {
    this.invoiceService.deleteInvoice($key);
    this.showUpdatedMessage = true;
    this.color = "danger"
    setTimeout(() => this.showUpdatedMessage = false, 3000);
    this.msg = "this record has been deleted"
  }

  onSubmitUpdate() {
    if (this.form.valid && this.form.controls['totalPrice'].value > 0) {
      const result: IInvoice = <IInvoice>this.form.value;
      this.invoiceService.updateInvoice(result);
      this.addMsg('success', '3000', 'this record has been updated');

    } else { alert("This record can not be updated with values 0. If you want to delete this record, go back to the list and do it") }
  }

  public addPurchase(product: IProduct): void {
    const control = <FormArray>this.form.controls['purchases'];
    let add = true;
    for (let i in control.controls) {
      if (control.at(+i).get('product').value.name === product.name) {
        control.at(+i).get('quantity').setValue(control.at(+i).get('quantity').value + 1);
        add = false;
      }
    }
    if (add) {
      control.push(this.purchaseForm(product));
    }
  }

  public addMsg(color, timeout, msg) {
    this.showUpdatedMessage = true;
    this.color = color;
    this.msg = msg;
    setTimeout(() => this.showUpdatedMessage = false, timeout);

  }

  money(value: number) {
    let tmoney = this.invoiceService.money(value);
    return tmoney;
  }

  filterCondition(customer) {    
    return customer.customer.name.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1 || customer.customer.lastname.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.invoiceList.length, page);
    // get current page of items
    this.pagedItems = this.invoiceList.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}
