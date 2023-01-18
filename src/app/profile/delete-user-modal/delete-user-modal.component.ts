import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProfileService} from "../profile.service";
import {AuthenticationService} from "../../authentication/authentication.service";

@Component({
  selector: 'app-komponent',
  templateUrl: './delete-user-modal.component.html'
})
export class DeleteUserModal {
  closeResult = '';

  constructor(private modalService: NgbModal,
              private profileService: ProfileService,
              private authenticationService: AuthenticationService) {}

  open(content:any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.profileService.deleteUser();
        this.authenticationService.logout();
      },
      (reason) => {
      },
    );
  }
}
