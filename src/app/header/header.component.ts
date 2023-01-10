import {Component, ElementRef} from '@angular/core';
import {AuthenticationService} from "../authentication/authentication.service";
import {User} from "../houses/user.model";
import {HouseService} from "../houses/house.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isOpen = false;
  image: string;

  constructor(private elRef: ElementRef,
              private appService: AuthenticationService,
              private houseService: HouseService) {
    this.houseService.userChanged.subscribe((user: User) => {
      this.image = user.image;
    })
    this.houseService.getUser();
  }

  logout() {
    this.appService.logout();
  }

  authenticated() {
    return localStorage.getItem("authenticated") == "true"
  }
}
