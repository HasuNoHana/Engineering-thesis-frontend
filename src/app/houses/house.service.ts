import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HouseBuddy} from "./house-buddy.model";
import {Subject} from "rxjs";
import {debugLog, debugLogOnlyMessage} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  usersChanged = new Subject<HouseBuddy[]>();
  users: HouseBuddy[];

  userChanged = new Subject<HouseBuddy>();
  user: HouseBuddy;

  joinCodeChanged = new Subject<string>();
  joinCode: string;

  proposedImagesChanged = new Subject<string[]>();
  proposedImages: string[] = []

  username: string;

  doneTasksThisWeekChanged = new Subject<number>();
  doneTasksThisWeek: number;

  constructor(private http: HttpClient) {
    this.users = <HouseBuddy[]>[];
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

   fetchUsers() {
    this.http.get<HouseBuddy[]>('/api/users',{withCredentials: true})
      .subscribe((users: HouseBuddy[]) => {
        debugLogOnlyMessage("GET: api/users");
        this.users = users;
        this.usersChanged.next(this.users.slice());
      });
  }

  fetchUser() {
    this.http.get<HouseBuddy>('/api/currentUserData',{withCredentials: true})
      .subscribe((user: HouseBuddy) => {
        debugLog("GET: api/currentUserData, response:", user);
        this.user = user;
        this.userChanged.next(this.user);
      });
  }

  fetchDoneTasksThisWeek() {
    this.http.get<number>('/api/doneTasksThisWeek',{withCredentials: true})
      .subscribe((doneTasksThisWeek: number) => {
        debugLog("GET: api/doneTasksThisWeek, response:", doneTasksThisWeek);
        this.doneTasksThisWeek = doneTasksThisWeek;
        this.doneTasksThisWeekChanged.next(this.doneTasksThisWeek);
      });
  }

  fetchJoinCode() {
    this.http.get<string>('/api/joinCode',{withCredentials: true})
      .subscribe((joinCode: string) => {
        debugLogOnlyMessage("GET: api/joinCode");
        this.joinCode = joinCode;
        this.joinCodeChanged.next(this.joinCode);
      });
  }

  editUser(user: HouseBuddy) {
    this.http.post<HouseBuddy>('/api/editUser', user, {withCredentials: true})
      .subscribe((recivedUser: HouseBuddy) => {
        debugLog("POST: api/editUser, request:", user);
        debugLog("response:", recivedUser);
        this.user = recivedUser;
        this.userChanged.next(this.user);
        this.fetchData();
      });
  }

  private fetchProposedImages() {
    this.http.get<string[]>('/api/avatarImages',{withCredentials: true})
      .subscribe((images: string[]) => {
        debugLogOnlyMessage("GET: api/avatarImages");
        this.proposedImages = images;
        this.proposedImagesChanged.next(this.proposedImages);
      });
  }

  editPhoto(image: string) {
    let user = new HouseBuddy(-1, this.username, this.user.currentPoints, this.user.weeklyContribution, image);
    this.editUser(user);
  }

  editRange(id: number, weeklyFirewoodContribution: number) {
    let user = new HouseBuddy(id, this.username, this.user.currentPoints, weeklyFirewoodContribution, this.user.avatarImageUrl);
    this.editUser(user);
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

  getProposedAvatarImages() {
    this.fetchProposedImages()
    return this.proposedImages.slice();
  }

  getDoneTasksThisWeek() {
    return this.doneTasksThisWeek;
  }
}
