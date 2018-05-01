import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppConst } from '../../constant/app-const';
import { User } from '../../models/user';
import {Book} from '../../models/book';
import {CartService} from '../../services/cart.service';
import {ShoppingCart} from '../../models/shopping-cart';
import {CartItem} from '../../models/cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  private selectedBook: Book;
  private cartItemList: CartItem[] = [];
  private cartItemNumber: number;
  private shioppingCart: ShoppingCart = new ShoppingCart();
  private cartItemUpdated: boolean;
  private emptyCart: boolean;
  private notEnoughStock: boolean;

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  onSelect(book: Book){
    this.selectedBook = book;
    this.router.navigate(['/book-detail/' , this.selectedBook.id]);
  }

  onRemoveCartItem(cartItem: CartItem){
    this.cartService.removeCartItem(cartItem.id).subscribe(
      res => {
        console.log(res.text());
        this.getCartItemList();
        this.getShoppingCart();
      },error => {
        console.log(error.text());
      }
    );
  }

  onUpdateCartItem(cartItem: CartItem){
    this.cartService.updateCartItem(cartItem.id , cartItem.qty).subscribe(
      res => {
        console.log(res.text());
        this.cartItemUpdated = true;
        this.getShoppingCart();
      },error =>{
        console.log(error.text());
      }
    );
  }

  getCartItemList(){
    this.cartService.getCartItemList().subscribe(
      res => {
        this.cartItemList = res.json();
        this.cartItemNumber = this.cartItemList.length;
      },error=>{
        console.log(error.text());
      }
    );
  }

  getShoppingCart(){
    this.cartService.getShoppingCart().subscribe(
      res=>{
        console.log(res.json());
        this.shioppingCart = res.json();
      },error=>{
    console.log(error.text());
      }
    );
}

onCheckOut(){
    if(this.cartItemNumber == 0){
      this.emptyCart = true;
    }else{
      for (let item of this.cartItemList){
        if(item.qty > item.book.inStockNumber){
          this.notEnoughStock = true;
          return;
        }
      }
      //this.router.navigate(['/order']);
    }
}

  ngOnInit() {
    this.getCartItemList();
    this.getShoppingCart();
  }

}
