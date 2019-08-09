import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {map} from 'rxjs/operators';
import { InvoiceService } from '../../../services/invoice.service';
import { IInvoice } from '../../../models/invoice';
import { FormBuilder, FormArray } from '@angular/forms';
import { PagerService } from '../../../services/pager.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  constructor(private invoiceService: InvoiceService,private _fb: FormBuilder,private ref: ChangeDetectorRef,private pagerService: PagerService) { }
  invoiceList: any[];
  showDiv: true;
  showEdit: true;
  resultform: '';
  summed;
  searchText: string = "";
  showDeletedMessage: boolean;
  showUpdatedMessage:boolean;
  private allItems: any[];
   // pager object
   pager: any = {};
   // paged items
   pagedItems: any[];

  ngOnInit() {
    this.showDiv = true;

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
  }

  onDelete($key: string) {   
    this.invoiceService.deleteInvoice($key);
    this.showDeletedMessage = true;
      setTimeout(() => this.showDeletedMessage = false, 3000);
  } 

  removeDiv() {
    this.showDiv = true;
    this.showEdit = null;
  }

  filterCondition(customer) {  
    return customer.customer.name.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1 || customer.customer.lastname.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;}

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
