import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {

  constructor(public authService: AuthenticationService,
              private router: Router
              ) { }

  ngOnInit(): void {
  }

  signUp() {
    // this.authService.signUp(this.credentials, () => {
    //   this.router.navigateByUrl('/rooms');
    // });
    // return false;
  }
}
