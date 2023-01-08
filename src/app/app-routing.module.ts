import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksComponent} from "./tasks/tasks.component";
import {RoomsComponent} from "./rooms/rooms.component";
import {RoomEditComponent} from "./rooms/room-edit/room-edit.component";
import {RoomListComponent} from "./rooms/room-list/room-list.component";
import {TaskListComponent} from "./tasks/task-list/task-list.component";
import {TaskEditComponent} from "./tasks/task-edit/task-edit.component";
import {LoginComponent} from "./authentication/login/login.component";
import {OnlyLoggedInUsersGuardService} from "./authentication/only-logged-in-users-guard.service";
import {SignUpComponent} from "./authentication/sign-up/sign-up.component";
import {RoomDetailComponent} from "./rooms/room-detail/room-detail.component";

const appRoutes: Routes = [

  {path: '', pathMatch: 'full', redirectTo: 'tasks'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {
    path: 'tasks', component: TasksComponent, canActivate: [OnlyLoggedInUsersGuardService], children: [
      {path: 'list', component: TaskListComponent},
      {path: 'list/new', component: TaskEditComponent},
      {path: 'list/todo/:currentTaskId', component: TaskEditComponent},
      {path: 'list/done/:currentTaskId', component: TaskEditComponent},
    ]
  },
  {
    path: 'rooms', component: RoomsComponent,  canActivate: [OnlyLoggedInUsersGuardService], children: [
      {path: '', component: RoomListComponent},
      {path: 'new', component: RoomEditComponent},
      {path: 'details/:id', component: RoomDetailComponent},
      {path: 'edit/:id', component: RoomEditComponent},
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
