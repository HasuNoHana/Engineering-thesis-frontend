import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RoomService} from "../room.service";
import {Room} from "../room.model";

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  room: Room;
  notDoneTasksForRooms: Map<number, number> = new Map();
  notDoneTasksForCurrent: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private roomService: RoomService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let roomId = +params['id'];
      let room = this.roomService.getRoom(roomId);
      if(room){
        this.room = room
        this.notDoneTasksForRooms = this.roomService.getNotDoneTasksForRooms();
        this.notDoneTasksForCurrent = this.notDoneTasksForRooms.get(this.room.id) ?? 0;
      }
    })
  }

  onCreateNewTask() {
    this.router.navigate(['tasks/list/new']);
  }

}
