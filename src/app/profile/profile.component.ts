import {Component, OnInit} from '@angular/core';
import {HouseBuddy} from "../houses/HouseBuddy.model";
import {HouseService} from "../houses/house.service";
import {Router} from "@angular/router";
import {debugLog} from "../app.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  joinCode: string;
  inviteClicked: boolean;
  houseBuddy: HouseBuddy;
  passwordChanged: boolean = false;

  constructor(private houseService: HouseService,
              private router: Router) { }

  ngOnInit(): void {
    this.getJoinCode();
    this.getUserAndWidth();
  }

  private getJoinCode() {
    this.houseService.joinCodeChanged.subscribe((joinCode: string) => {
      this.joinCode = joinCode;
    })
    this.joinCode = this.houseService.getJoinCode();
  }

  private getUserAndWidth() {
    this.houseService.houseBuddyChanged.subscribe((user: HouseBuddy) => {
      debugLog("Getting new user data", user);
      this.houseBuddy = user;
    })
    this.houseBuddy = this.houseService.getCurrentUser();
  }

  onInviteClicked() {
    this.passwordChanged = false;
    if(this.inviteClicked) {
      this.joinCode = this.houseService.getJoinCode();
    }
    this.inviteClicked = !this.inviteClicked
  }

  onEditPhoto() {
    this.passwordChanged = false;
    this.router.navigateByUrl('/my/house/editPhoto');
  }

}
