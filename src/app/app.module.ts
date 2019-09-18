import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database'

import { CategoriesComponent } from './components/categories/categories.component';
import { CustomersComponent } from './components/customers/customers.component';
import { IloginComponent } from './components/ilogin/ilogin.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsComponent } from './components/products/products.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { HomeComponent } from './components/home/home.component';
import { InvoiceComponent } from './components/invoices/invoice/invoice.component';
import { InvoiceListComponent } from './components/invoices/invoice-list/invoice-list.component';
import { CategoryComponent } from './components/categories/category/category.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { CustomerComponent } from './components/customers/customer/customer.component';
import { CustomerListComponent } from './components/customers/customer-list/customer-list.component';
import { ProductComponent } from './components/products/product/product.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductService } from './services/product.service';
import { CustomerService } from './services/customer.service';
import { InvoiceService } from './services/invoice.service';
import { AuthService } from './services/auth.service';
import { PagerService } from './services/pager.service';
import { AuthGuard } from './auth.guard';

import { environment } from '../environments/environment';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    CustomersComponent,
    IloginComponent,
    InvoicesComponent,
    NavbarComponent,
    ProductsComponent,
    DialogComponent,
    HomeComponent,
    InvoiceComponent,
    InvoiceListComponent,
    CategoryComponent,
    CategoryListComponent,
    CustomerComponent,
    CustomerListComponent,
    ProductComponent,
    ProductListComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService,
    CustomerService,
    InvoiceService,
    AuthService,
    PagerService,
    AuthGuard   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
