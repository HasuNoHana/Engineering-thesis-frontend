import {Component, OnInit} from '@angular/core';
import {HouseService} from "../../houses/house.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-photo',
  templateUrl: './edit-photo.component.html',
  styleUrls: ['./edit-photo.component.css']
})
export class EditPhotoComponent implements OnInit {

  proposedImages: string[];
  imageForm: FormGroup;
  selected: number = -1;

  constructor(private houseService: HouseService,
              private router: Router,) { }

  ngOnInit(): void {
    this.proposedImages = this.houseService.getProposedAvatarImages();
    this.initForm();
  }

  onImageClicked(image: string) {
    this.houseService.editPhoto( image);
    this.onCancel();
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
  }

  onLeave() {
    this.selected = -1;
  }

  onCancel() {
    this.router.navigateByUrl('/dashboard');
  }
}
