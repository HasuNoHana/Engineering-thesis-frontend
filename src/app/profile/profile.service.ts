import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Room} from "../rooms/room.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  changePassword(password: string) {
    this.http.post<Room>('http://localhost:4200/api/changePassword', password,{withCredentials: true})
      .subscribe((_: any) => {
      });
  }

  deleteUser() {
    this.http.delete<Room>('http://localhost:4200/api/deleteCurrentUser',{withCredentials: true})
      .subscribe((_: any) => {
      });
  }
}
