import {Component, OnInit} from '@angular/core';
import {Book} from '../../models/book';
import {BookService} from '../../services/book.service';
import {Params, ActivatedRoute, Router} from '@angular/router';
import {AppConst} from '../../constant/app-const';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  private bookId: number;
  private book: Book = new Book();
  private serverPath = AppConst.serverPath;
  private numberList: number[] = [1, 2, 3, 4, 5, 6, 7, 8.9];
  private qty: number;
  private addBookSuccess: boolean = false ;
  private notEnoughStock: boolean = false ;


  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  onAddToCart(){}

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.bookId = Number.parseInt(params['id']);
    });
    this.bookService.getBook(this.bookId).subscribe(
      res => {
        this.book = res.json();
      },error => {
        console.log(error);
      }
    );
    this.qty = 1 ;
  }

}
