import { Injectable } from '@angular/core';
import { AppConst } from '../constant/app-const';
import { Http, Headers } from '@angular/http';
import { UserPayment } from '../models/user-payment';

@Injectable()
export class PaymentService {

  private servaerPath: string = AppConst.serverPath;

  constructor(private http: Http) { }

  newPayment(payment: UserPayment) {
    let url = this.servaerPath + '/payment/add';
    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, JSON.stringify(payment), { headers: tokenHeader });
  }

  getUserPaymentList() {
    let url = this.servaerPath + '/payment/getUserPaymentList';
    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.get(url, { headers: tokenHeader });
  }

  removePayment(id: number) {
    let url = this.servaerPath + '/payment/remove/' + id;
    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, { headers: tokenHeader });
  }

  setDefaultPayment(id: number) {
    let url = this.servaerPath + '/payment/setDefault/' + id;
    let tokenHeader = new Headers({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.http.post(url, { headers: tokenHeader });
  }

}
