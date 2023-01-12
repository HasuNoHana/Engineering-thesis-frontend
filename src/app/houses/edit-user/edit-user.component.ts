import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HouseService} from "../house.service";
import {User} from "../user.model";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {

  id: number;
  user: User;
  userForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private houseService: HouseService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.houseService.usersChanged.subscribe((_: any) => {
      let user = this.houseService.getUserById(this.id);
      if(this.user === undefined) {
        console.error("Edited user does not exist");
      } else {
        this.user = (<User>user);
      }
    })
    this.route.params.subscribe((params: Params) => {
        this.id = +params['id'];
        this.initForm();
      }
    );
  }

  private initForm() {
    let user = this.houseService.getUserById(this.id);
    this.user = (<User>user);
    let range = this.user.range

    this.userForm = new FormGroup({
      'range': new FormControl(range, Validators.required)
    });
  }

  onSubmit() {
    this.houseService.editRange(this.id, this.userForm.value['range'])
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }
}
