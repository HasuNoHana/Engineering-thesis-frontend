import {Component, ElementRef} from '@angular/core';
import {AuthenticationService} from "../authentication/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  isOpen = false;

  constructor(private elRef: ElementRef,
              private appService: AuthenticationService) {
  }

  showDropdown() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.appService.logout();
  }

  authenticated() { return localStorage.getItem("authenticated") == "true" }
}
