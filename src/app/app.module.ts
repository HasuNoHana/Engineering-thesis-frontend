import {Injectable, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {TasksComponent} from './tasks/tasks.component';
import {TaskListComponent} from './tasks/task-list/task-list.component';
import {AppRoutingModule} from "./app-routing.module";
import {HeaderComponent} from './header/header.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RoomsComponent} from './rooms/rooms.component';
import {RoomListComponent} from './rooms/room-list/room-list.component';
import {LoginComponent} from './authentication/login/login.component';
import {AuthenticationService} from "./authentication/authentication.service";
import {TaskService} from "./tasks/task.service";
import {OnlyLoggedInUsersGuardService} from "./authentication/only-logged-in-users-guard.service";
import {SignUpComponent} from './authentication/sign-up/sign-up.component';
import {RoomDetailComponent} from './rooms/room-detail/room-detail.component';
import {HousesComponent} from './houses/houses.component';
import {HouseComponent} from './houses/house/house.component';
import {EditPhotoComponent} from './profile/edit-photo/edit-photo.component';
import {DeleteUserModal} from './profile/delete-user-modal/delete-user-modal.component';
import {ProfileComponent} from './profile/profile.component';
import {ChangePasswordModalComponent} from './profile/change-password-modal/change-password-modal.component';
import {DevPageComponent} from './dev/dev-page/dev-page.component';
import {EditTaskModalComponent} from "./tasks/edit-task-modal/edit-task-modal.component";
import {EditUserModalComponent} from "./houses/edit-user-modal/edit-user-modal.component";
import {EditRoomModalComponent} from "./rooms/edit-room-modal/edit-room-modal.component";

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

@NgModule({
    declarations: [
        AppComponent,
        TasksComponent,
        TaskListComponent,
        HeaderComponent,
        RoomsComponent,
        RoomListComponent,
        LoginComponent,
        SignUpComponent,
        RoomDetailComponent,
        HousesComponent,
        HouseComponent,
        EditPhotoComponent,
        DeleteUserModal,
        ProfileComponent,
        ChangePasswordModalComponent,
        DevPageComponent,
        EditTaskModalComponent,
        EditUserModalComponent,
        EditRoomModalComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [
    AuthenticationService,
    TaskService,
    OnlyLoggedInUsersGuardService,
    {provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
