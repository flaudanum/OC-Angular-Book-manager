import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';

/** List of book items that are available in the back-end storage */
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  booksSubscription: Subscription;

  constructor(private bookService: BooksService, private router: Router) { }

  ngOnInit() {
    this.booksSubscription = this.bookService.bookSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    // Récupération des livres par le service
    this.bookService.getBooks();
    // Emission vers les 'observer' ayant souscrit au service
    this.bookService.emitBooks();
  }

  /** Navigate to the view for creating a new book */
  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  /** Request the deletion of the book item from the back-end storage */
  onDeleteBook(book: Book) {
    this.bookService.removeBook(book);
  }

  /** Navigate to the view showing the book's information */
  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }

  /** Unsubscribe to the `rxjs.Subject` *bookSubject* provided by [[BooksService]] on destruction */
  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

}
