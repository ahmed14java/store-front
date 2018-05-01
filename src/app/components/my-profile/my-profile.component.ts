import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { PaymentService } from '../../services/payment.service';
import { ShippingService } from '../../services/shipping.service';
import { Router } from '@angular/router';
import { AppConst } from '../../constant/app-const';
import { User } from '../../models/user';
import { Http, Headers, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserBilling } from '../../models/user-billing';
import { UserShipping } from '../../models/user-shipping';
import { UserPayment } from '../../models/user-payment';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  private serverPath = AppConst.serverPath;
  private dataFetched: boolean = false;
  private loginError: boolean;
  private loggedIn: boolean;
  private credential = { 'username': '', 'password': '' };

  private user: User = new User();
  private updateSuccess: boolean;
  private newPassword: string;
  private incorrectPassword: boolean;
  private currentPassword: string;

  private selectedProfileTab: number = 0;
  private selectedBillingTab: number = 0;
  private selectedShippingTab: number = 0;

  private userPayment: UserPayment = new UserPayment();
  private userBilling: UserBilling = new UserBilling();
  private userPaymentList: UserPayment[] = [];
  private defaultPaymentSet: boolean;
  private defaultUserPaymentId: number;

  private stateList: string[] = [];


  private userShipping: UserShipping = new UserShipping();
  private userShippingList: UserShipping[] = []; 
  private defaultShippingSet: boolean;
  private defaultUserShippingId: number;



  file: File;
  filesToUpload: Array<File>;

  @ViewChild('file') inputEl: ElementRef;
  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
    private paymentService: PaymentService,
    private shippingService: ShippingService,
    private http: Http
  ) {
    this.filesToUpload = [];
  }

  selectedShippingChange(val: number){
    this.selectedShippingTab = val;
  }

  selectedBillingChange(val: number){
    this.selectedBillingTab = val;
  }

  onUpdateUserInfo() {
    this.userService.updateUserInfo(this.user, this.newPassword, this.currentPassword).subscribe(
      res => {
        console.log(res.text());
        this.updateSuccess = true;
      }, error => {
        console.log(error.text());
        let errorMessage = error.text();
        if (errorMessage === 'Incorrect current password!') this.incorrectPassword = true;
      }
    );
  }
  getCurrentUser() {

    for(let s in AppConst.usStates){
      this.stateList.push(s);
    }

    this.userService.getCurrentUser().subscribe(
      res => {
        this.user = res.json();
        this.userPaymentList = this.user.userPaymentList;
        this.userShippingList = this.user.userShippingList ;
        console.log('------------------------------------',this.userPaymentList);

        for(let index in this.userPaymentList){
          if(this.userPaymentList[index].defaultPayment){
            console.log(this.userPaymentList[index]);
            this.defaultUserPaymentId = this.userPaymentList[index].id;
            console.log('-----------------------',this.defaultUserPaymentId)
            break;
          }
        }

        for(let index in this.userShippingList){
          if(this.userShippingList[index].userShippingDefault){
            console.log(this.userShippingList[index]);
            this.defaultUserShippingId = this.userShippingList[index].id;
            console.log('-----------------------',this.defaultUserShippingId)
            break;
          }
        }

        this.dataFetched = true;
      }, error => {
        console.log(error);
      }
    );
  }

  onNewShipping(){
    this.shippingService.newShipping(this.userShipping).subscribe(
      res => {
        this.getCurrentUser();
        this.selectedShippingTab = 0;
        this.userShipping = new UserShipping();
      },error =>{
        console.log(error.text());
      }
    );
  }

  onUpdateUserShipping(shipping: UserShipping){
    this.userShipping = shipping;
    this.selectedShippingTab = 1;
  }

  onRemoveShipping(id: number){
    this.shippingService.removeShipping(id).subscribe(
      res => {
        this.getCurrentUser();
      },error => {
        console.log(error.text());
      }
    );
  }

  setDefaultShipping(){
    this.defaultShippingSet = false ;
    console.log(this.defaultUserShippingId);
    this.shippingService.setDefaultShipping(this.defaultUserShippingId).subscribe(
      res => {
        this.getCurrentUser();
        this.defaultShippingSet = true ;

      },error => {
        console.log(error.text());
      }
    );
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      res => {
        this.loggedIn = true;
      }, error => {
        this.loggedIn = false;
        console.log('inactive session');
        this.router.navigate(['my-account']);
      }
    );
    this.getCurrentUser();
    this.userBilling.userBillingState = '';
    this.userPayment.type = '';
    this.userPayment.expiryMonth='';
    this.userPayment.expiryYear='';
    this.userPayment.userBilling = this.userBilling;
    this.defaultPaymentSet = false;

    this.userShipping.userShippingState = '';
    this.defaultShippingSet= false;
    
  }

  onNewPayment(){
    this.paymentService.newPayment(this.userPayment).subscribe(
      res => {
        this.getCurrentUser();
        this.selectedBillingTab = 0;
        this.userPayment = new UserPayment();
      },error =>{
        console.log(error.text());
      }
    );
  }

  onUpdatePayment(payment: UserPayment){
    this.userPayment = payment;
    this.userBilling = payment.userBilling;
    this.selectedBillingTab = 1;
  }

  onRemovePayment(id: number){
    this.paymentService.removePayment(id).subscribe(
      res => {
        this.getCurrentUser();
      },error => {
        console.log(error.text());
      }
    );
  }

  setDefaultPayment(){
    this.defaultPaymentSet = false ;
    this.paymentService.setDefaultPayment(this.defaultUserPaymentId).subscribe(
      res => {
        this.getCurrentUser();
        this.defaultPaymentSet = true;
      },error => {
        console.log(error.text());
      }
    );
  }


  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  fileUpload() {
    /*
    this.makeFileRequest('http://localhost:8080/user/uploadFile' , [] , this.filesToUpload).then(
      (result) => {
        console.log(result);
      }, (error) => {
        console.log(error);
      }
      );
      */
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) {
      for (let i = 0; i < fileCount; i++) {
        formData.append('file[]', inputEl.files.item(i));
        console.log(inputEl.files.item(i))
      }

      console.log(fileCount);// print count of files correctly 
      let headers = new Headers();// import { Headers,BaseRequestOptions } from '@angular/http';
      headers.append('enctype', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      let options = new BaseRequestOptions();
      options.headers = headers;

      this.http.post("http://localhost:8080/user/uploadFile", formData).subscribe(res => res.json());
    }
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      let formData: any = new FormData();
      let xhr = new XMLHttpRequest();
      for (let i = 0; i < files.length; i++) {
        formData.append(files[i].name, files[i], files[i].name);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            console.log('image upload successfully!');
          } else {
            reject(xhr.response)
          }
        }
      }
      xhr.open('POST', url, true);
      xhr.setRequestHeader('x-auth-token', localStorage.getItem('xAuthToken'));
      console.log(xhr);
      console.log(formData);
      xhr.send(formData);
    });
  }

}
