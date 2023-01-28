import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalInformationService} from "../../shared/modal-information.service";
import {Room} from "../../rooms/room.model";
import {debugLogOnlyMessage} from "../../app.component";
import {HouseService} from "../../houses/house.service";

@Component({
  selector: 'app-edit-photo-modal',
  templateUrl: './edit-photo-modal.component.html',
  styleUrls: ['./edit-photo-modal.component.css']
})
export class EditPhotoModalComponent implements OnInit, OnDestroy {
  closeResult = '';
  imageForm: FormGroup;
  @ViewChild("content",{static:true}) content:ElementRef;

  subscriptions: Array<any> = [];

  proposedImages: string[];
  selected: number = -1;
  room: Room;

  urlPattern = 'https?://.*';

  constructor(private modalService: NgbModal,
              private modalInformationService: ModalInformationService,
              private houseService: HouseService) { }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  ngOnInit(): void {
    this.proposedImages = this.houseService.getProposedAvatarImages();
    this.houseService.proposedImagesChanged.subscribe((images: string[]) => {
      this.proposedImages = images;
    })

    this.subscribeToEditModalEvent();
  }

  private subscribeToEditModalEvent() {
    this.subscriptions.push(this.modalInformationService.editPhotoSignal.subscribe((_: any) => {
      debugLogOnlyMessage("edit photo modal")
      this.initForm();
      this.open(this.content)
    }))
  }

  open(content:any) {
    debugLogOnlyMessage("opening photo modal")
    this.modalService.open(content, { size: 'xl', ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.houseService.editPhoto(this.imageForm.value['imageUrl']);
      },
      (reason) => {
      },
    );
  }

  private initForm() {
    this.imageForm = new FormGroup({
      'imageUrl': new FormControl("",
        [Validators.required, Validators.pattern(this.urlPattern)])
    });
  }

  onImageClicked(image: string) {
    this.imageForm.setValue({
      imageUrl: image
    })
  }

}
