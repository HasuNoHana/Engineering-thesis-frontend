import {Component, OnInit} from '@angular/core';
import {HouseBuddy} from "../houses/HouseBuddy.model";
import {HouseService} from "../houses/house.service";
import {Router} from "@angular/router";
import {debugLog} from "../app.component";
import {ModalInformationService} from "./modal-information.service";
import {ProfileService} from "./profile.service";

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
  passwordChangeMessage: string = "none";

  constructor(private houseService: HouseService,
              private router: Router,
              private modalInformationService: ModalInformationService,
              private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.passwordChangeSuccess.subscribe((isSuccess: boolean) => {
      if(isSuccess) {
        this.passwordChangeMessage = "success"; //NOSONAR
      } else {
        this.passwordChangeMessage = "error"; //NOSONAR
      }
    })
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

  onUserDelete() {
    this.modalInformationService.onDeleteUser();
  }

  onPasswordChange() {
    this.modalInformationService.onPasswordChange();
  }
}
