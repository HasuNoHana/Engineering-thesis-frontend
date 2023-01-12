import {Component, OnInit} from '@angular/core';
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
  joinCode: string;
  inviteClicked: boolean;
  houseBuddy: HouseBuddy;

  constructor(private houseService: HouseService,
              private router: Router) {}

  ngOnInit(): void {
    // @ts-ignore
    this.username = localStorage.getItem("username");
    this.getUserAndWidth();
    this.getUsers();
    this.getJoinCode();
  }


  private getUsers() {
    this.houseService.usersChanged.subscribe((users: User[]) => {
      this.users = users;
    })
    this.users = this.houseService.getUsers();
  }

  private getUserAndWidth() {
    this.houseService.houseBuddyChanged.subscribe((user: HouseBuddy) => {
      debugLog("Getting new user data", user);
      this.houseBuddy = user;
      this.width = Math.ceil((this.houseBuddy.firewoodStackSize / this.houseBuddy.weeklyFirewoodContribution) * 100);
    })
    this.houseBuddy = this.houseService.getCurrentUser();
    this.width = Math.ceil((this.houseBuddy.firewoodStackSize / this.houseBuddy.weeklyFirewoodContribution) * 100);
  }

  private getJoinCode() {
    this.houseService.joinCodeChanged.subscribe((joinCode: string) => {
      this.joinCode = joinCode;
    })
    this.joinCode = this.houseService.getJoinCode();
  }

  onInviteClicked() {
    if(this.inviteClicked) {
      this.joinCode = this.houseService.getJoinCode();
    }
    this.inviteClicked = !this.inviteClicked
  }

  onEditPhoto() {
    this.router.navigateByUrl('/my/house/editPhoto');
  }
}
