import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RoomService} from "../room.service";
import {RoomDto} from "../roomDto.model";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['room-edit.component.css']
})
export class RoomEditComponent implements OnInit {
  id: number;
  roomForm: FormGroup;
  defaultRoomImage = 'https://upload.wikimedia.org/wikipedia/commons/3/31/White_paper.jpg';

  constructor(private route: ActivatedRoute,
              private roomService: RoomService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];//NOSONAR //TODO co to znaczy
        this.initForm();
      }
    );
  }

  onSubmit() {
    let roomUrl = this.roomForm.value['image'];
    if(roomUrl === '') {
      roomUrl = this.defaultRoomImage;
    }
    let roomDto = new RoomDto(this.roomForm.value['name'], roomUrl);
    if(this.id) {
      this.roomService.updateRoom(this.id, roomDto);
    } else {
      this.roomService.addRoom(roomDto);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let roomName = '';
    let roomImagePath = '';

    this.roomForm = new FormGroup({
      'name': new FormControl(roomName, Validators.required),
      'image': new FormControl(roomImagePath),
    });
  }
}
