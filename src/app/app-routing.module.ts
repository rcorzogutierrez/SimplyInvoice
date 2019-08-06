import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CustomersComponent } from './components/customers/customers.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { HomeComponent } from './components/home/home.component';
import { IloginComponent } from './components/ilogin/ilogin.component';
import { InvoiceListComponent } from './components/invoices/invoice-list/invoice-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  {path: 'products', canActivate: [AuthGuard], component: ProductsComponent},
  {path: 'categories', canActivate: [AuthGuard], component: CategoriesComponent},
  {path: 'customers', canActivate: [AuthGuard], component: CustomersComponent},
  {path: 'invoices', canActivate: [AuthGuard], component: InvoicesComponent},
  {path: 'invoices-list', canActivate: [AuthGuard], component: InvoiceListComponent},
  {path: 'home', canActivate: [AuthGuard], component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'ilogin', component : IloginComponent},
  {path: '**', component: NotFoundComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
