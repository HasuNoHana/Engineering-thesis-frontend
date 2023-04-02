import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Room} from "../rooms/room.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  passwordChangeSuccess = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  changePassword(currentPassword: string, password: string) {
    let paswords = {"currentPassword": currentPassword, "newPassword": password}
    return this.http.post<Room>('http://localhost:8080/api/changePassword', paswords,{withCredentials: true})
      .subscribe((_: any) => {
      this.passwordChangeSuccess.next(true);
    }, (error: any) => {
      this.passwordChangeSuccess.next(false);
    });
  }

  deleteUser() {
    this.http.delete<Room>('http://localhost:8080/api/deleteCurrentUser',{withCredentials: true})
      .subscribe((_: any) => {
        localStorage.removeItem("username");
        localStorage.setItem("authenticated","false")
      });
  }
}
