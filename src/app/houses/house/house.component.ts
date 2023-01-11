import {Component, OnInit} from '@angular/core';
import {HouseService} from "../house.service";
import {User} from "../user.model";
import {ActivatedRoute, Router} from "@angular/router";

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
  user: User;

  constructor(private houseService: HouseService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
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
    this.houseService.userChanged.subscribe((user: User) => {
      this.user = user;
      this.width = Math.ceil((this.user.points / this.user.range) * 100);
    })
    this.user = this.houseService.getCurrentUser();
    this.width = Math.ceil((this.user.points / this.user.range) * 100);
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
