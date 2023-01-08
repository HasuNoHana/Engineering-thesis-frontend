import {Component, OnInit} from '@angular/core';
import {Room} from "../room.model";
import {RoomService} from "../room.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit{

  rooms: Room[];

  constructor(private roomService: RoomService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.rooms = this.roomService.getRooms();
    this.roomService.roomsChanged.subscribe((rooms: Room[]) => {
      this.rooms = rooms;
    })
  }

  onNewRoom() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onRoomDetails(roomId: number) {
    this.router.navigate(['details', roomId], {relativeTo: this.route});
  }

  onDeleteRoom(roomId: number) {
    this.roomService.deleteRoom(roomId);
  }

  onEditRoom(id: number) {
    this.router.navigate(['edit', id], {relativeTo: this.route});
  }
}
