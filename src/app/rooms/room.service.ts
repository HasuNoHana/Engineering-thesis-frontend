import {Injectable} from "@angular/core";
import {Room} from "./room.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {RoomDto} from "./roomDto.model";

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
    this.fetchRooms();
    return this.rooms.slice();
  }

  getRoom(roomId: number) {
    return this.rooms.find(r => r.id === +roomId);
  }

  private fetchRooms() {
    this.http.get<Room[]>('http://localhost:4200/api/rooms',{withCredentials: true})
      .subscribe((rooms: Room[]) => {
        this.rooms = rooms;
        this.roomsChanged.next(this.rooms.slice());
      });
  }

  getRoomByName(name: string) {
    let r: Room;
    this.rooms.forEach((room) => {
        if (room.name === name) {
          r = room;
        }
    });
    // @ts-ignore
    return r;
  }

  deleteRoom(roomId: number) {
    this.http.delete<number>('http://localhost:4200/api/deleteRoom?id='+roomId,{withCredentials: true})
      .subscribe((id: number) => {
        let index = this.rooms.findIndex(function (room){
          return room.id===roomId;
        });
        this.rooms.splice(index,1);
        this.roomsChanged.next(this.rooms.slice());
      });
  }

  updateRoom(roomId: number, roomDto: RoomDto) {
    this.http.post<Room>('http://localhost:4200/api/updateRoom?id='+roomId, roomDto,{withCredentials: true})
      .subscribe((_: any) => {
        this.fetchRooms();
      });
  }

  addRoom(roomDto: RoomDto) {
    this.http.post<Room>('http://localhost:4200/api/addRoom', roomDto,{withCredentials: true})
      .subscribe((_: any) => {
        this.fetchRooms();
      });
  }
}
