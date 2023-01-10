import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  usersChanged = new Subject<User[]>();
  users: User[];

  userChanged = new Subject<User>();
  user: User;

  joinCodeChanged = new Subject<string>();
  joinCode: string;

  constructor(private http: HttpClient) {
    this.users = <User[]>[];
    this.fetchUsers();
    this.fetchUser();
    this.fetchJoinCode();
  }

  fetchUser() {
    this.http.get<User>('http://localhost:4200/api/userData',{withCredentials: true})
      .subscribe((user: User) => {
        this.user = user;
        this.userChanged.next(this.user);
      });
  }

  private fetchUsers() {
    this.http.get<User[]>('http://localhost:4200/api/users',{withCredentials: true})
      .subscribe((users: User[]) => {
        this.users = users;
        this.usersChanged.next(this.users.slice());
      });
  }

  getUsers() {
    return this.users.slice();
  }

  getUser() {
    return this.user;
  }

  getJoinCode() {
    return this.joinCode;
  }

  fetchJoinCode() {
    this.http.get<string>('http://localhost:4200/api/joinCode',{withCredentials: true})
      .subscribe((joinCode: string) => {
        this.joinCode = joinCode;
        this.joinCodeChanged.next(this.joinCode);
      });
  }
}
