import {Injectable} from "@angular/core";
import {Room} from "./room.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  roomsChanged = new Subject<Room[]>();
  rooms: Room[] = [];

  constructor(private http: HttpClient) {
    this.fetchRooms();
  }

  getRooms() {
    return this.rooms.slice();
  }

  addRoom(room: Room) {
    this.rooms.push(room);
    this.roomsChanged.next(this.rooms.slice());
  }

  private fetchRooms() {
    this.http.get<Room[]>('http://localhost:4200/api/rooms',{withCredentials: true})
      .subscribe((rooms: Room[]) => {
        this.rooms = rooms;
        this.roomsChanged.next(this.rooms.slice());
      });
  }
}
