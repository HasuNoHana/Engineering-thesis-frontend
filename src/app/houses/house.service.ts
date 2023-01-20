import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user.model";
import {Subject} from "rxjs";
import {UserDTO} from "./UserDTO.model";
import {debugLog} from "../app.component";
import {HouseBuddy} from "./HouseBuddy.model";

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  usersChanged = new Subject<User[]>();
  users: User[];

  houseBuddyChanged = new Subject<HouseBuddy>();
  houseBuddy: HouseBuddy;

  joinCodeChanged = new Subject<string>();
  joinCode: string;

  proposedImagesChanged = new Subject<string[]>();
  proposedImages: string[]

  username: string;

  doneTasksThisWeekChanged = new Subject<number>();
  doneTasksThisWeek: number;

  constructor(private http: HttpClient) {
    this.users = <User[]>[];
    // @ts-ignore
    this.username =localStorage.getItem("username");
    this.fetchUsers();
    this.fetchUser();
    this.fetchJoinCode();
    this.fetchProposedImages();
    this.fetchDoneTasksThisWeek();
  }

  public fetchData() {
    this.fetchUsers();
    this.fetchUser();
    this.fetchUsers();
    this.fetchDoneTasksThisWeek();
  }

  private fetchUsers() {
    this.http.get<User[]>('http://localhost:4200/api/users',{withCredentials: true})
      .subscribe((users: User[]) => {
        this.users = users;
        this.usersChanged.next(this.users.slice());
      });
  }

  fetchUser() {
    this.http.get<HouseBuddy>('http://localhost:4200/api/currentUserData',{withCredentials: true})
      .subscribe((user: HouseBuddy) => {
        debugLog("GET: api/currentUserData, response:", user);
        this.houseBuddy = user;
        this.houseBuddyChanged.next(this.houseBuddy);
      });
  }

  fetchDoneTasksThisWeek() {
    this.http.get<number>('http://localhost:4200/api/doneTasksThisWeek',{withCredentials: true})
      .subscribe((doneTasksThisWeek: number) => {
        debugLog("GET: api/doneTasksThisWeek, response:", doneTasksThisWeek);
        this.doneTasksThisWeek = doneTasksThisWeek;
        this.doneTasksThisWeekChanged.next(this.doneTasksThisWeek);
      });
  }

  fetchJoinCode() {
    this.http.get<string>('http://localhost:4200/api/joinCode',{withCredentials: true})
      .subscribe((joinCode: string) => {
        this.joinCode = joinCode;
        this.joinCodeChanged.next(this.joinCode);
      });
  }

  editUser(id: number, userDTO: UserDTO) {
    this.http.post<HouseBuddy>('http://localhost:4200/api/editUser?id='+id, userDTO, {withCredentials: true})
      .subscribe((houseBuddy: HouseBuddy) => {
        debugLog("POST: api/editUser, request:", userDTO);
        debugLog("response:", houseBuddy);
        this.houseBuddy = houseBuddy;
        this.houseBuddyChanged.next(this.houseBuddy);
      });
  }

  private fetchProposedImages() {
    this.http.get<string[]>('http://localhost:4200/api/avatarImages',{withCredentials: true})
      .subscribe((images: string[]) => {
        this.proposedImages = images;
        this.proposedImagesChanged.next(this.proposedImages);
      });
  }

  editPhoto(image: string) {
    let user = new UserDTO(this.username, this.houseBuddy.currentPoints, this.houseBuddy.weeklyContribution, image);
    this.editUser(-1, user);
  }

  editRange(id: number, weeklyFirewoodContribution: number) {
    let user = new UserDTO(this.username, this.houseBuddy.currentPoints, weeklyFirewoodContribution, this.houseBuddy.avatarImageUrl);
    this.editUser(id, user);
  }

  getUsers() {
    return this.users.slice();
  }

  getCurrentUser() {
    return this.houseBuddy;
  }

  getJoinCode() {
    return this.joinCode;
  }

  getUserById(id: number) {
    return this.users.find(user => user.id === id);
  }

  getProposedAvatarImages() {
    return this.proposedImages.slice();
  }


  getUserWithId(id: number) {
    return this.users.find(user => user.id === id);
  }

  getDoneTasksThisWeek() {
    return this.doneTasksThisWeek;
  }
}
