import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-proposed-images',
  templateUrl: './proposed-images.component.html'
})
export class ProposedImagesComponent {

  @Input() proposedImages: string[];
  @Output() imageClicked = new EventEmitter<string>();
  selected = -1;

  onEnter(index:number) {
    this.selected = index;
  }

  onLeave() {
    this.selected = -1;
  }

  onImageClicked(image: string) {
    this.imageClicked.emit(image);
  }

}
