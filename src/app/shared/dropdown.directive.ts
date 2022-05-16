import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  isOpen = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    if (this.isOpen === false) {
      this.renderer.removeClass(this.elRef.nativeElement, 'show');
    } else {
      this.renderer.addClass(this.elRef.nativeElement, 'show');
    }
  }
}
