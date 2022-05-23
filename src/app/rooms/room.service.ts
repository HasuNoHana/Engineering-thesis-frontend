import {Injectable} from "@angular/core";
import {Room} from "./room.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  roomsChanged = new Subject<Room[]>();
  rooms: Room[] = [
    new Room("Kuchnia", 'https://upload.wikimedia.org/wikipedia/commons/3/31/White_paper.jpg'),
    new Room("Kuchnia", 'https://upload.wikimedia.org/wikipedia/commons/b/b8/L_K%C3%BCche_2015.jpg'),
    new Room("Łazienka", 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Bathroom_with_tub_and_fireplace_%28Pleasure_Point_Roadhouse%2C_Monterey_Bay%2C_California_-_30_September%2C_2002%29.jpg'),
    new Room("Łazienka", 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Bathroom_with_tub_and_fireplace_%28Pleasure_Point_Roadhouse%2C_Monterey_Bay%2C_California_-_30_September%2C_2002%29.jpg'),
    new Room("Łazienka", 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Bathroom_with_tub_and_fireplace_%28Pleasure_Point_Roadhouse%2C_Monterey_Bay%2C_California_-_30_September%2C_2002%29.jpg'),
  ]

  getRooms() {
    return this.rooms.slice();
  }

  addRoom(room: Room) {
    console.log(room);
    this.rooms.push(room);
    this.roomsChanged.next(this.rooms.slice());
  }
}
