import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

import { AngularFireAuth } from '@angular/fire/auth';
import { Observable} from 'rxjs';

import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>;
  public isLoggedId; 
  public user$ = this._authService.user;

  constructor(private invoiceService: InvoiceService,private _authService: AuthService, afAuth: AngularFireAuth) {
    this.user = afAuth.authState;    
    this._authService.isAuthenticated()
    .subscribe(
      success => this.isLoggedId = success
      
    );
   }

  ngOnInit() {
  }

  logout(){
    this._authService.logout();

  }

}
