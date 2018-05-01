import { Injectable } from '@angular/core';
import { AppConst } from '../constant/app-const';
import { Http, Headers } from '@angular/http';
import  { UserShipping } from '../models/user-shipping';

@Injectable()
export class ShippingService {

  private servaerPath: string = AppConst.serverPath;
  
    constructor(private http: Http) { }

    newShipping(shipping: UserShipping) {
      let url = this.servaerPath + '/shipping/add';
      let tokenHeader = new Headers({
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('xAuthToken')
      });
      return this.http.post(url, JSON.stringify(shipping), { headers: tokenHeader });
    }

    getUserShippingList() {
      let url = this.servaerPath + '/shipping/getUserShippingList';
      let tokenHeader = new Headers({
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('xAuthToken')
      });
      return this.http.get(url, { headers: tokenHeader });
    }

    removeShipping(id: number) {
      let url = this.servaerPath + '/shipping/remove/' + id;
      let tokenHeader = new Headers({
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('xAuthToken')
      });
      return this.http.post(url, { headers: tokenHeader });
    }

    setDefaultShipping(id: number) {
      let url = this.servaerPath + '/shipping/setDefault/' + id;
      let tokenHeader = new Headers({
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('xAuthToken')
      });
      return this.http.post(url, { headers: tokenHeader });
    }

}
