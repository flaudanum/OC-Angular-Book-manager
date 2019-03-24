/**
 * On the first usage, visit the tab *Storage* on the firebase website for activation.
 */

 /** Import dependencies.
  *
  * *Rem*: w/o this comment *TypeDoc* does not takes the module doc comment above into account
  */
import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

/** Service for accessing the back-end storage (*firebase* back-end). */
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  bookSubject = new Subject<Book[]>();

  constructor() {
    this.getBooks();
  }

  emitBooks() {
    this.bookSubject.next(this.books);
  }

  saveBooks() {
    firebase.database().ref('/books').set(this.books);
  }

  // video: 37'20"
  getBooks() {
    firebase.database().ref('/books').on('value', (data) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    });
  }

  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  /** Remove a book item from the back-end storage */
  removeBook(book: Book) {
    // Remove the picture of the book if existing
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log("The book's picture is removed!");
        },
        (error) => {
          console.log("Could not remove the book's picture: " + error);
        }
      );
    }

    // Remove book from books' array
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  // video: 57'12"
  /** This method uploads a file to the firebase storage
   *
   * @param file File to be uploaded
   *
   * **Remark**: Do not use the deprecated property `firebase.storage.UploadTaskSnapshot.downloadURL` which seems to be dysfunctional w/ package *firebase* 5.8.3
  */
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueURI = 'images/' + Date.now().toString() + file.name;
        const upload = firebase.storage().ref().child(almostUniqueURI).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log("Chargement ...");
          },
          (error) => {
            console.log("Erreur de chargement ! : " + error);
            reject(error);
          },
          () => {
            /** direct URL to the file
             * A `Promise` to the URL is returned
            */
            const downloadURLPromise = firebase.storage().ref().child(almostUniqueURI).getDownloadURL();
            resolve(downloadURLPromise);
          }
        );
      }
    );
  }

}
