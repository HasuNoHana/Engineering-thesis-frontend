import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksComponent} from "./tasks/tasks.component";
import {RoomsComponent} from "./rooms/rooms.component";
import {RoomListComponent} from "./rooms/room-list/room-list.component";
import {TaskListComponent} from "./tasks/task-list/task-list.component";
import {LoginComponent} from "./authentication/login/login.component";
import {OnlyLoggedInUsersGuardService} from "./authentication/only-logged-in-users-guard.service";
import {SignUpComponent} from "./authentication/sign-up/sign-up.component";
import {RoomDetailComponent} from "./rooms/room-detail/room-detail.component";
import {HousesComponent} from "./houses/houses.component";
import {HouseComponent} from "./houses/house/house.component";
import {ProfileComponent} from "./profile/profile.component";
import {DevPageComponent} from "./dev/dev-page/dev-page.component";

const appRoutes: Routes = [

  {path: '', pathMatch: 'full', redirectTo: 'tasks'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'dashboard', component: ProfileComponent},
  {path: "dev", component:DevPageComponent},
  {path: 'my', component: HousesComponent, canActivate: [OnlyLoggedInUsersGuardService], children: [
      {path: 'house', component: HouseComponent}
    ]},
  {
    path: 'tasks', component: TasksComponent, canActivate: [OnlyLoggedInUsersGuardService], children: [
      {path: 'list', component: TaskListComponent}
    ]
  },
  {path: 'rooms', component: RoomsComponent,  canActivate: [OnlyLoggedInUsersGuardService], children: [
      {path: '', component: RoomListComponent},
      {path: 'details/:id', component: RoomDetailComponent, pathMatch: 'full'}
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
