import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { Params , ActivatedRoute , Router } from '@angular/router';
import { AppConst } from '../../constant/app-const';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  private serverPath = AppConst.serverPath;

  public filterQuery = '';
  public rowsOnPage = 5;

  private selectedBook: Book ;
  private bookList: Book[];


  constructor(
      private bookService: BookService,
      private router: Router,
      private route: ActivatedRoute
    ) { }

    onSelect(book: Book){
      this.selectedBook = book;
      this.router.navigate(['book-detail/' , this.selectedBook.id]);

    }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params =>{
        if (params['book-list']){
          console.log('filtered book list');
          this.bookList = JSON.parse(params['book-list']);
        } else {
          this.bookService.getBookList().subscribe(
            res => {
              console.log(res.json());
              this.bookList = res.json();
            },error => {
              console.log(error);
            }
          );
        }
      }
    );
  }

}
