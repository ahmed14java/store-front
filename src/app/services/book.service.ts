import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AppConst} from '../constant/app-const';
import {Router} from '@angular/router';


@Injectable()
export class BookService {

  private serverPath = AppConst.serverPath;

  constructor(private http: Http) { }

  getBookList(){
    let url = this.serverPath + '/book/bookList';
    let tokenHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers: tokenHeaders});
  }

  getBook(id: number){
    let url = this.serverPath + '/book/' + id ;
    let tokenHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, {headers: tokenHeaders});
  }

  searchBook(keyword: string){
    let url = this.serverPath + '/book/searchBook/' + keyword;
    let tokenHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, {headers: tokenHeaders});
  }

}
