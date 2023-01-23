import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalInformationService} from "../../profile/modal-information.service";
import {Room} from "../../rooms/room.model";
import {RoomService} from "../../rooms/room.service";
import {debugLog, debugLogOnlyMessage} from "../../app.component";

@Component({
  selector: 'app-edit-room-modal',
  templateUrl: './edit-room-modal.component.html',
  styleUrls: ['./edit-room-modal.component.css']
})
export class EditRoomModalComponent implements OnInit, OnDestroy {
  closeResult = '';
  roomForm: FormGroup;
  @ViewChild("content",{static:true}) content:ElementRef;

  acceptMessage: string;
  header: string;

  subscriptions: Array<any> = [];

  defaultRoomImage = 'https://upload.wikimedia.org/wikipedia/commons/3/31/Cib-nextdoor_%28CoreUI_Icons_v1.0.0%29.svg';
  proposedImages: string[];
  selected: number = -1;
  room: Room;

  urlPattern = 'https?://.*';


  constructor(private modalService: NgbModal,
              private modalInformationService: ModalInformationService,
              private roomService: RoomService) { }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  ngOnInit(): void {
    this.proposedImages = this.roomService.getProposedRoomImages();
    this.roomService.proposedImagesChanged.subscribe((images: string[]) => {
      this.proposedImages = images;
    });

    this.subscribeToEditModalEvent();
    this.subscribeToNewModalEvent();
  }

  private subscribeToNewModalEvent() {
    this.subscriptions.push(this.modalInformationService.newRoomSignal.subscribe((_: any) => {
      this.header = "Stwórz nowy pokój"
      this.acceptMessage = "Stwórz pokój"
      debugLogOnlyMessage("open new room modal")
      this.initFormEmpty();
      this.open(this.content)
    }))
  }

  private subscribeToEditModalEvent() {
    this.subscriptions.push(this.modalInformationService.editRoomSignal.subscribe((room: Room) => {
      this.header = "Zmień istniejący pokój"
      this.acceptMessage = "zmień pokój"
      this.room = room;
      debugLog("edit room modal received room with id: ", room.id)
      this.initFormWithTask();
      this.open(this.content)
    }))
  }

  open(content:any) {
    debugLogOnlyMessage("opening room modal")
    this.modalService.open(content, { size: 'xl', ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        let roomUrl = this.roomForm.value['image'];
        if(roomUrl === '') {
          roomUrl = this.defaultRoomImage;
        }
        if(this.room) {
          let room = new Room(this.room.id, this.roomForm.value['name'], roomUrl, this.room.tasksNotDone);
          this.roomService.updateRoom(room);
        } else {
          let room = new Room(-1, this.roomForm.value['name'], roomUrl, 0);
          this.roomService.addRoom(room);
        }
      },
      (reason) => {
      },
    );
  }

  private initFormEmpty() {
    let roomName = '';
    let roomImagePath = '';

    this.roomForm = new FormGroup({
      'name': new FormControl(roomName, Validators.required),
      'image': new FormControl(roomImagePath, Validators.pattern(this.urlPattern)),
    });
  }

  private initFormWithTask() {
    let roomName = this.room.name;
    let roomImagePath = this.room.image;

    this.roomForm = new FormGroup({
      'name': new FormControl(roomName, Validators.required),
      'image': new FormControl(roomImagePath, Validators.pattern(this.urlPattern)),
    });
  }

  onImageClicked(image: string) {
    this.roomForm.setValue({
      'name': this.roomForm.value['name'],
      'image': image
    });
  }
}
