import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RoomService} from "../room.service";
import {Room} from "../room.model";
import {debugLogOnlyMessage} from "../../app.component";

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {

  room: Room;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private roomService: RoomService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      let roomId = +params['id'];
      debugLogOnlyMessage("OnInit room detail, room id: "+roomId);

      this.roomService.roomsChanged.subscribe((_:any) => {
        let room = this.roomService.getRoom(roomId);
        if(room){
          this.room = room
        }
      })
    })
  }

  onCreateNewTask() {
    this.router.navigate(['tasks/list/new']);
  }

}
