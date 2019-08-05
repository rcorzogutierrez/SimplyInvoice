import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {from as observableFrom, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<firebase.User>;

  constructor(public _authFB: AngularFireAuth, private _router: Router, private _ngZone: NgZone, ) {
    this.user = this._authFB.authState;    
  }
}
