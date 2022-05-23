import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RoomService} from "../room.service";
import {Room} from "../room.model";

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html'
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
    if((<Room>this.roomForm.value).image === '') {
      this.roomService.addRoom(new Room((<Room>this.roomForm.value).name, this.defaultRoomImage))
    } else {
      this.roomService.addRoom(this.roomForm.value);
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
      'img': new FormControl(roomImagePath),
    });
  }
}
