import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HouseService} from "../house.service";
import {User} from "../user.model";
import {Router} from "@angular/router";
import {debugLog} from "../../app.component";
import {HouseBuddy} from "../HouseBuddy.model";

@Component({
  selector: 'app-user-information',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

  username: string;
  image: string;
  width:number;
  users: User[]
  houseBuddy: HouseBuddy;
  doneTasksThisWeek: number;

  @Output() newItemEvent = new EventEmitter<string>();

  constructor(private houseService: HouseService,
              private router: Router) {}

  ngOnInit(): void {
    // @ts-ignore
    this.username = localStorage.getItem("username");
    this.getUsers();
    this.getUserAndWidth();
    this.getDoneTasksThisWeek();
  }


  private getUsers() {
    this.houseService.usersChanged.subscribe((users: User[]) => {
      console.log("aaaaa")
      this.users = users;
      console.log(this.users)
    })
    this.users = this.houseService.getUsers();
  }

  private getUserAndWidth() {
    this.houseService.houseBuddyChanged.subscribe((user: HouseBuddy) => {
      debugLog("Getting new user data", user);
      this.houseBuddy = user;
      this.width = Math.ceil((this.houseBuddy.currentPoints / this.houseBuddy.weeklyContribution) * 100);
    })
    this.houseBuddy = this.houseService.getCurrentUser();
    console.log(this.houseBuddy);
    this.width = Math.ceil((this.houseBuddy.currentPoints / this.houseBuddy.weeklyContribution) * 100);
  }



  private getDoneTasksThisWeek() {
    this.houseService.doneTasksThisWeekChanged.subscribe((doneTasksThisWeek: number) => {
      this.doneTasksThisWeek = doneTasksThisWeek;
      console.log(doneTasksThisWeek);
    })
    this.doneTasksThisWeek = this.houseService.getDoneTasksThisWeek();
  }
}
