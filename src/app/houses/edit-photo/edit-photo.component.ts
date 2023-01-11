import {Component, OnInit} from '@angular/core';
import {HouseService} from "../house.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.css']
})
export class EditPhotoComponent implements OnInit {

  proposedImages: String[];
  imageForm: FormGroup;
  mouseOver = false;
  selected: number = -1;

  constructor(private houseService: HouseService,
              private router: Router,) { }

  ngOnInit(): void {
    this.proposedImages = this.houseService.getProposedImages();
    this.initForm();
  }

  onImageClicked(image: String) {
    this.houseService.editPhoto(image);
    this.router.navigateByUrl('/my/house');
  }

  private initForm() {
    this.imageForm = new FormGroup({
      'imageUrl': new FormControl("", Validators.required)
    });
  }

  onSubmit() {
    this.onImageClicked(this.imageForm.value['imageUrl']);
  }

  onEnter(index:number) {
    this.selected = index;
    this.mouseOver = true;
  }

  onLeave() {
    this.selected = -1;
    this.mouseOver = false;
  }

  onCancel() {
    this.router.navigateByUrl('/my/house');
  }
}
