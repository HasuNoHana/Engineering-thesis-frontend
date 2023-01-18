import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProfileService} from "../profile.service";
import {AuthenticationService} from "../../authentication/authentication.service";
import {ModalInformationService} from "../modal-information.service";

@Component({
  selector: 'app-komponent',
  templateUrl: './delete-user-modal.component.html'
})
export class DeleteUserModal implements OnInit {
  closeResult = '';
  @ViewChild("content",{static:true}) content:ElementRef;

  constructor(private modalService: NgbModal,
              private profileService: ProfileService,
              private authenticationService: AuthenticationService,
              private modalInformationService: ModalInformationService) {}

  ngOnInit() {
    this.modalInformationService.deleteUserSignal.subscribe((_: any) => {
      this.open(this.content)
    })
  }

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
