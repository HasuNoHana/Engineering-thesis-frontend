import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksComponent} from "./tasks/tasks.component";
import {RoomsComponent} from "./rooms/rooms.component";
import {RoomEditComponent} from "./rooms/room-edit/room-edit.component";
import {RoomListComponent} from "./rooms/room-list/room-list.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full'},
  { path: 'tasks', component: TasksComponent},
  { path: 'rooms', component: RoomsComponent, children: [
      {path: '', component: RoomListComponent},
      {path: 'new', component: RoomEditComponent},
    ]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
