import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {from as observableFrom, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<firebase.User>;

  constructor(public _authFB: AngularFireAuth, private _router: Router, private _ngZone: NgZone, ) {
    this.user = this._authFB.authState;    
  }

  isAuthenticated(): Observable<boolean> {
    return this.user.pipe(map(user => user && user.uid !== undefined));
  }

  login(email, password): Observable<any> {
    return observableFrom(
      this._authFB.auth.signInWithEmailAndPassword(email, password)
    );
  }

  logout() {
    this._authFB.auth.signOut()
      .then(() => {
        this._router.navigate(['/ilogin']);
      });
  }
}
