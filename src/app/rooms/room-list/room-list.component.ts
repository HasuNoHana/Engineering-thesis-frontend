import {Component, OnInit} from '@angular/core';
import {Room} from "../room.model";
import {RoomService} from "../room.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalInformationService} from "../../shared/modal-information.service";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit{

  rooms: Room[];

  constructor(private roomService: RoomService,
              private router: Router,
              private route: ActivatedRoute,
              private modalInformationService: ModalInformationService) {}

  ngOnInit() {
    this.rooms = this.roomService.getRooms();
    this.roomService.roomsChanged.subscribe((rooms: Room[]) => {
      this.rooms = rooms;
    })

  }

  onNewRoom() {
    this.modalInformationService.onNewRoom();
  }

  onRoomDetails(roomId: number) {
    this.router.navigate(['details', roomId], {relativeTo: this.route});
  }

  onDeleteRoom(roomId: number) {
    this.roomService.deleteRoom(roomId);
  }

  onEditRoom(room: Room) {
    this.modalInformationService.onEditRoom(room);
  }
}
