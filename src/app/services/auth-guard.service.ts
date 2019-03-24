import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

// Video at 29'05"
/** This service implements the interface `CanActivate` from `@angular/router` for the authentication guard in the routing of the application */
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              resolve(true);
            } else {
              this.router.navigate(['/auth', 'signin']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}
