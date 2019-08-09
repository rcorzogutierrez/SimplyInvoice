import { Injectable } from '@angular/core';
import {IInvoice} from '../models/invoice';
import {AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  invoiceList: AngularFireList<any>;
  selectedInvoice: IInvoice = new IInvoice();

  constructor(private firebase: AngularFireDatabase,private authService: AuthService) {
    this.invoiceList = firebase.list('invoices');
   }

   getInvoices() {
    return this.invoiceList = this.firebase.list('invoices');
  }

  insertInvoice(invoice: IInvoice) {
    invoice.createdAt = new Date().toLocaleString();
    invoice.modifiedAt = new Date().toLocaleString();
    invoice.uid = this.authService._authFB.auth.currentUser.email;
    this.invoiceList.push(invoice);
  }

   updateInvoice(invoice: IInvoice) {
    this.invoiceList.update(invoice.$key, {
      totalPrice: invoice.totalPrice,
      purchases: invoice.purchases,
      customer:invoice.customer,
      modifiedAt: new Date().toLocaleString()   
    });
  }

  deleteInvoice($key: string){
    this.invoiceList.remove($key);
  } 

  money(value: number) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
  }
}
