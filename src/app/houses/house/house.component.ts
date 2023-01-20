import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {HouseService} from "../house.service";
import {User} from "../user.model";
import {Router} from "@angular/router";
import {HouseBuddy} from "../HouseBuddy.model";

@Component({
  selector: 'app-user-information',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit,OnDestroy {

  username: string;
  image: string;
  width:number;
  users: User[]
  houseBuddy: HouseBuddy;
  doneTasksThisWeek: number;

  @Output() newItemEvent = new EventEmitter<string>();

  constructor(private houseService: HouseService,
              private router: Router) {}
  ngOnDestroy() {
    console.log("onDerstoyHouse")
  }

  ngOnInit(): void {
    console.log("onInitHouse")
    // @ts-ignore
    this.username = localStorage.getItem("username");
    this.getUsers();
    this.getUserAndWidth();
    this.getDoneTasksThisWeek();
  }


  private getUsers() {
    this.houseService.fetchUsers();
    this.houseService.usersChanged.subscribe((users: User[]) => {
      this.users = users;
    })
    this.users = this.houseService.getUsers();
  }

  private getUserAndWidth() {
    this.houseService.fetchUser();
    this.houseService.houseBuddyChanged.subscribe((user: HouseBuddy) => {
      this.houseBuddy = user;
      this.width = Math.ceil((this.houseBuddy?.currentPoints / this.houseBuddy?.weeklyContribution) * 100);
    })
    this.houseBuddy = this.houseService.getCurrentUser();
    this.width = Math.ceil((this.houseBuddy?.currentPoints / this.houseBuddy?.weeklyContribution) * 100);
  }



  private getDoneTasksThisWeek() {
    this.houseService.fetchDoneTasksThisWeek();
    this.houseService.doneTasksThisWeekChanged.subscribe((doneTasksThisWeek: number) => {
      this.doneTasksThisWeek = doneTasksThisWeek;
    })
    this.doneTasksThisWeek = this.houseService.getDoneTasksThisWeek();
  }
}
