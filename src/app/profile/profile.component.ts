import {Component, OnInit} from '@angular/core';
import {HouseService} from "../houses/house.service";
import {Router} from "@angular/router";
import {debugLog} from "../app.component";
import {ModalInformationService} from "../shared/modal-information.service";
import {ProfileService} from "./profile.service";
import {AuthenticationService} from "../authentication/authentication.service";
import {HouseBuddy} from "../houses/house-buddy.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  joinCode: string;
  inviteClicked: boolean;
  user: HouseBuddy;
  passwordChanged: boolean = false;
  passwordChangeMessage: string = "none";
  username: string | null;

  constructor(private houseService: HouseService,
              private router: Router,
              private modalInformationService: ModalInformationService,
              private profileService: ProfileService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
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
    this.houseService.userChanged.subscribe((user: HouseBuddy) => {
      debugLog("Getting new user data", user);
      this.user = user;
    })
    this.user = this.houseService.getCurrentUser();
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
    this.modalInformationService.onEditPhoto();
  }

  onUserDelete() {
    this.modalInformationService.onDeleteUser();
  }

  onPasswordChange() {
    this.modalInformationService.onPasswordChange();
  }

  onDeleteUser() {
    this.profileService.deleteUser();
    this.authenticationService.logout();
  }
}
