// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import {AppService} from "../app.service";
//
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html'
// })
// export class LoginComponent {
//
//   credentials = {username: '', password: ''};
//
//   constructor(private app: AppService, private http: HttpClient, private router: Router) {
//   }
//
//   login() {
//     this.app.authenticate(this.credentials, () => {
//       this.router.navigateByUrl('/rooms');
//     });
//     return false;
//   }
//
// }

import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {

  credentials = {username: '', password: ''};

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
  }

  login() {
    this.app.authenticate(this.credentials, () => {
      this.router.navigateByUrl('/');
    });
    return false;
  }

}
