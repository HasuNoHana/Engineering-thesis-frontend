import {Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isOpen = false;

  constructor(private elRef: ElementRef) {
  }

  showDropdown() {
    this.isOpen = !this.isOpen;

  }
}
