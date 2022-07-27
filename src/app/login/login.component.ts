import {Component} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: './login.component.html',
  styleUrls: ["login.component.css"]
})
export class LoginComponent {

  credentials = {username: '', password: ''};

  constructor(public authService: AuthenticationService,
              private http: HttpClient,
              private router: Router) {
  }

  login() {
    this.authService.authenticate(this.credentials, () => {
      this.router.navigateByUrl('/rooms');
    });
    return false;
  }

}
