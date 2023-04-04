import {Injectable} from "@angular/core";
import {Room} from "./room.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {debugLog} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  roomsChanged = new Subject<Room[]>();
  private rooms: Room[] = [];

  proposedImagesChanged = new Subject<string[]>();
  private proposedRoomImages: string[] = [];


  constructor(private http: HttpClient) {
    this.fetchProposedRoomImages();
    this.fetchRooms();
  }

  private fetchProposedRoomImages() {
    this.http.get<string[]>('/api/roomImages',{withCredentials: true})
      .subscribe((images: string[]) => {
        this.proposedRoomImages = images;
        this.proposedImagesChanged.next(this.proposedRoomImages);
      });
  }

  getRooms() {
    this.fetchRooms();
    return this.rooms?.slice();
  }

  getRoom(roomId: number) {
    return this.rooms?.find(r => r.id === +roomId);
  }

  private fetchRooms() {
    this.http.get<Room[]>('/api/rooms',{withCredentials: true})
      .subscribe((rooms: Room[]) => {
        this.rooms = rooms;
        debugLog("GET: rooms: " , this.rooms);
        this.roomsChanged.next(this.rooms?.slice());
      });
  }

  getRoomByName(name: string) {
    let r: Room;
    this.rooms?.forEach((room) => {
        if (room.name === name) {
          r = room;
        }
    });
    // @ts-ignore
    return r;
  }

  deleteRoom(roomId: number) {
    this.http.delete<number>('/api/deleteRoom?id='+roomId,{withCredentials: true})
      .subscribe((_: number) => {
        let index = this.rooms?.findIndex(function (room){
          return room.id===roomId;
        });
        this.rooms?.splice(index,1);
        this.roomsChanged.next(this.rooms?.slice());
      });
  }

  updateRoom(room: Room) {
    this.http.post<Room>('/api/updateRoom', room,{withCredentials: true})
      .subscribe((_: any) => {
        this.fetchRooms();
      });
  }

  addRoom(room: Room) {
    this.http.post<Room>('/api/addRoom', room,{withCredentials: true})
      .subscribe((_: any) => {
        this.fetchRooms();
      });
  }

  getProposedRoomImages() {
    return this.proposedRoomImages.slice();
  }
}
