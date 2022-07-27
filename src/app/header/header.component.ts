import {Component, ElementRef, OnInit} from '@angular/core';
import {AuthenticationService} from "../login/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{

  isOpen = false;

  constructor(private elRef: ElementRef,
              private appService: AuthenticationService) {
  }

  ngOnInit() {
  }

  showDropdown() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.appService.logout();
  }
}
