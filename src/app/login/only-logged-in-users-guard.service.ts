import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AppService} from "../app.service";

@Injectable()
export class OnlyLoggedInUsersGuardService implements CanActivate {
  constructor(private appService: AppService) {}

  canActivate() {
    console.log("OnlyLoggedInUsers");
    if (localStorage.getItem("authenticated")=="true") {//TODO refactor to alswoej use localStorage.getItem("authenticated") not this.authenticated
      return true;
    } else {
      window.alert("You don't have permission to view this page");
      return false;
    }
  }
}
