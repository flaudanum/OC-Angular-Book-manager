import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

/** Authentication service */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // See video developpez-avec-angular_p4c4.mp4 at 12'10"
  /** Sign-up a new user */
  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  /** Sign-in an authenticated existing user */
  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }

}
