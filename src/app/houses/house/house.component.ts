import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {HouseService} from "../house.service";
import {HouseBuddy} from "../house-buddy.model";
import {Router} from "@angular/router";
import {ModalInformationService} from "../../shared/modal-information.service";
import {debugLogOnlyMessage} from "../../app.component";

@Component({
  selector: 'app-user-information',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit,OnDestroy {

  username: string;
  image: string;
  width:number;
  users: HouseBuddy[]
  houseBuddy: HouseBuddy;
  doneTasksThisWeek: number;

  @Output() newItemEvent = new EventEmitter<string>();

  constructor(private houseService: HouseService,
              private router: Router,
              private modalInformationService: ModalInformationService) {}
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
    this.houseService.usersChanged.subscribe((users: HouseBuddy[]) => {
      this.users = users;
    })
    this.users = this.houseService.getUsers();
  }

  private getUserAndWidth() {
    this.houseService.fetchUser();
    this.houseService.userChanged.subscribe((user: HouseBuddy) => {
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

  onEditUserRange(user: HouseBuddy) {
    debugLogOnlyMessage("onEditUserRange button clicked")
    this.modalInformationService.onEditUserRange(user)
  }
}
