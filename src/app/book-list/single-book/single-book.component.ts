import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

// video 47'47"

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

  book: Book;

  // 'route' sert à récupérer l'identifiant de l'URL
  constructor(private route: ActivatedRoute, private bookService: BooksService, 
              private router: Router) { }

  ngOnInit() {
    // Initialize w/ an empty book
    this.book = new Book('', '');
    // 'params' permet de récupérer les paramètres d'une route via l'interface 'snapshot'
    const id = this.route.snapshot.params['id'];
    this.bookService.getSingleBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    );
  }

  onBack() {
     this.router.navigate(['/books']);
  }

}
