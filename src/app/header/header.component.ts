import {Component, ElementRef} from '@angular/core';
import {AppService} from "../app.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isOpen = false;

  constructor(private elRef: ElementRef, private appService: AppService) {
  }

  showDropdown() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.appService.logout();
  }
}
