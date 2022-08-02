import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";
import {User} from "../user.model";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {

  user: User

  constructor(public authService: AuthenticationService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.user = new User("","");
  }

  signUp() {
    console.log(this.user);
    this.authService.signUp(this.user).subscribe(result => {
      console.log("yay", result);
    }, error => {
      console.log("error ", error)
    });
    //   , () => {
    //   this.router.navigateByUrl('/rooms');
    // });
  }
}
