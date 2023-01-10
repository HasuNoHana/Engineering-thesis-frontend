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

  private fetchUsers() {
    this.http.get<User[]>('http://localhost:4200/api/users',{withCredentials: true})
      .subscribe((users: User[]) => {
        this.users = users;
        this.usersChanged.next(this.users.slice());
      });
  }

  fetchUser() {
    this.http.get<User>('http://localhost:4200/api/userData',{withCredentials: true})
      .subscribe((user: User) => {
        this.user = user;
        this.userChanged.next(this.user);
      });
  }

  fetchJoinCode() {
    this.http.get<string>('http://localhost:4200/api/joinCode',{withCredentials: true})
      .subscribe((joinCode: string) => {
        this.joinCode = joinCode;
        this.joinCodeChanged.next(this.joinCode);
      });
  }

  editUser(id: number, range: number) {
    this.http.post<User>('http://localhost:4200/api/editUser?id='+id, {range: range}, {withCredentials: true})
      .subscribe((_: any) => {
        this.fetchUsers();
      });
  }

  getUsers() {
    return this.users.slice();
  }

  getCurrentUser() {
    return this.user;
  }

  getJoinCode() {
    return this.joinCode;
  }

  getUserById(id: number) {
    return this.users.find(user => user.id === id);
  }
}
