import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AppConst} from '../constant/app-const';


@Injectable()
export class CartService {

  private serverPath = AppConst.serverPath;

  constructor(private http: Http) {
  }

  addItem(id: number, tqy: number) {
    let url = this.serverPath + '/cart/add';
    let cartItemInfo = {
      'bookId': id,
      'qty': qty
    };
    let tokenHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, cartItemInfo, {headers: tokenHeaders});
  }

  getCartItemList(){
    let url = this.serverPath + '/cart/getCartItemList';
    let tokenHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers: tokenHeaders});
  }

  getShoppingCart(){
    let url = this.serverPath + '/cart/getShoppingCart';
    let tokenHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers: tokenHeaders});
  }

  updateCartItem(cartItemId: number , qty: number){
    let url = this.serverPath + '/cart/updateCartItem';
    let cartItemInfo = {
      'cartItemId': cartItemId,
      'qty': qty
    };
    let tokenHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, cartItemInfo, {headers: tokenHeaders});
  }

  removeCartItem(id: number){
    let url = this.serverPath + '/cart/removeCartItem/'+id;
    let tokenHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, {headers: tokenHeaders});
  }

}
