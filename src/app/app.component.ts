import { Component } from '@angular/core';

// Import firebase
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-manager';

  constructor() {
      const config = {
        apiKey: "AIzaSyCBTdyGKHoB_zDHeh4yw7M9pP1mwSpbSPc",
        authDomain: "bookshelves-friedrich-16100.firebaseapp.com",
        databaseURL: "https://bookshelves-friedrich-16100.firebaseio.com",
        projectId: "bookshelves-friedrich-16100",
        storageBucket: "bookshelves-friedrich-16100.appspot.com",
        messagingSenderId: "266403863278"
      };
      firebase.initializeApp(config);
  }
}
