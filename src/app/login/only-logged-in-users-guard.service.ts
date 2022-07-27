import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class OnlyLoggedInUsersGuardService implements CanActivate {
  constructor(private appService: AuthenticationService,
              private router: Router) {}

  canActivate() {
    console.log("OnlyLoggedInUsers");
    if (this.appService.authenticated) {
      return true;
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
