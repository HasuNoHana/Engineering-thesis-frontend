import {Component} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserSignup} from "./userSignup.model";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {


  credentials = {username: '', password: '', passwordConfirmation: '', houseJoinCode: ''};


  constructor(public authService: AuthenticationService,
              private http: HttpClient,
              private router: Router) {
  }

  signup() {

    // TODO validate credentials (check passowrd confirmation)

    let userSignup: UserSignup = new UserSignup(this.credentials.username, this.credentials.password, this.credentials.houseJoinCode);

    this.http.post('api/create-user', userSignup).subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
