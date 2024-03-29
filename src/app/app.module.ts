import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import {DeleteModalComponent} from './shared/delete-modal/delete-modal.component';
import {ProfileComponent} from './profile/profile.component';
import {ChangePasswordModalComponent} from './profile/change-password-modal/change-password-modal.component';
import {DevPageComponent} from './dev/dev-page/dev-page.component';
import {EditTaskModalComponent} from "./tasks/edit-task-modal/edit-task-modal.component";
import {EditUserModalComponent} from "./houses/edit-user-modal/edit-user-modal.component";
import {EditRoomModalComponent} from "./rooms/edit-room-modal/edit-room-modal.component";
import {EditPhotoModalComponent} from "./profile/edit-photo-modal/edit-photo-modal.component";
import {ProposedImagesComponent} from './shared/proposed-images/proposed-images.component';
import {AuthInterceptorService} from "./authentication/auth-interceptor.service";

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
        DeleteModalComponent,
        ProfileComponent,
        ChangePasswordModalComponent,
        DevPageComponent,
        EditTaskModalComponent,
        EditUserModalComponent,
        EditRoomModalComponent,
        EditPhotoModalComponent,
        ProposedImagesComponent
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
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
