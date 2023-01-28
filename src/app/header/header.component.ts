import {Component, ElementRef} from '@angular/core';
import {AuthenticationService} from "../authentication/authentication.service";
import {HouseService} from "../houses/house.service";
import {HouseBuddy} from "../houses/house-buddy.model";

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
    this.houseService.userChanged.subscribe((user: HouseBuddy) => {
      this.image = user.avatarImageUrl;
    })
    this.houseService.getCurrentUser();
  }

  logout() {
    this.appService.logout();
  }

  authenticated() {
    return localStorage.getItem("authenticated") == "true"
  }
}
