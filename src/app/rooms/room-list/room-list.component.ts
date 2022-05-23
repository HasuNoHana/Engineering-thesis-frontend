import {Component, OnInit} from '@angular/core';
import {Room} from "../room";
import {RoomService} from "../room.service";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html'
})
export class RoomListComponent implements OnInit{

  rooms: Room[];

  constructor(private roomService: RoomService) {}

  ngOnInit() {
    this.rooms = this.roomService.getRooms();
  }
}
