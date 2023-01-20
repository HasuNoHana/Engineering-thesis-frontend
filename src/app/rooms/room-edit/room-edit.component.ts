import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RoomService} from "../room.service";
import {Room} from "../room.model";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['room-edit.component.css']
})
export class RoomEditComponent implements OnInit {
  id: number;
  roomForm: FormGroup;
  defaultRoomImage = 'https://upload.wikimedia.org/wikipedia/commons/3/31/Cib-nextdoor_%28CoreUI_Icons_v1.0.0%29.svg';
  editMode = false;
  proposedImages: string[];
  selected: number = -1;
  room: Room;

  urlPattern = 'https?://([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  constructor(private route: ActivatedRoute,
              private roomService: RoomService,
              private router: Router) { }

  ngOnInit(): void {
    this.proposedImages = this.roomService.getProposedRoomImages();
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = this.router.url.includes('edit');
      this.initForm();
      }
    );
  }

  onSubmit() {
    let roomUrl = this.roomForm.value['image'];
    if(roomUrl === '') {
      roomUrl = this.defaultRoomImage;
    }
    if(this.id) {
      let room = new Room(this.room.id, this.roomForm.value['name'], roomUrl, this.room.tasksNotDone);
      this.roomService.updateRoom(room);
    } else {
      let room = new Room(-1, this.roomForm.value['name'], roomUrl, 0);
      this.roomService.addRoom(room);
    }
    this.onCancel();
  }

  onCancel() {
    if(this.editMode) {
      this.editMode = false;
      this.router.navigate(['../../'], {relativeTo: this.route});
    } else {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  private initForm() {
    let roomName = '';
    let roomImagePath = '';

    if(this.editMode) {
      let room = this.roomService.getRoom(this.id);
      if(room === undefined) {
        console.error("Edited room does not exist");
      } else {
        this.room = room;
        roomName = room.name;
        roomImagePath = room.image;
      }
    }

    this.roomForm = new FormGroup({
      'name': new FormControl(roomName, Validators.required),
      'image': new FormControl(roomImagePath, Validators.pattern(this.urlPattern)),
    });
  }

  onEnter(index:number) {
    this.selected = index;
  }

  onLeave() {
    this.selected = -1;
  }

  onImageClicked(image: string) {
    this.roomForm.setValue({
      'name': this.roomForm.value['name'],
      'image': image
    });
  }
}
