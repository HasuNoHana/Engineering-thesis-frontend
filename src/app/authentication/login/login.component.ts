import {Component} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: './login.component.html'
})
export class LoginComponent {

  credentials = {username: '', password: ''};
  failedToAuthenticate: boolean = false;

  constructor(public authService: AuthenticationService,
              private http: HttpClient,
              private router: Router) {
  }

  login() {
    this.authService.authenticate(this.credentials, (noError: boolean) => {
      if (noError) {
        this.failedToAuthenticate = false
        this.router.navigateByUrl('/tasks/list');
      } else {
        this.failedToAuthenticate = true
      }
    });
    return false;
  }

}
