import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../profile.service";

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html'
})
export class ChangePasswordModalComponent implements OnInit {
  closeResult = '';
  changePasswordForm: FormGroup;
  @Output("passwordChanged") passwordChanged = new EventEmitter<boolean>();

  constructor(private modalService: NgbModal,
              private profileService: ProfileService) { }

  ngOnInit(): void {
    this.initForm();
  }

  open(content:any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log("tak")
        this.profileService.changePassword(this.changePasswordForm.value.password);
        this.passwordChanged.emit(true);
      },
      (reason) => {
      },
    );
  }

  private initForm() {

    this.changePasswordForm = new FormGroup({
      'password': new FormControl("", Validators.required),
      'repeatedPassword': new FormControl("", [Validators.required])
    });
  }


}
