import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksComponent} from "./tasks/tasks.component";
import {RoomsComponent} from "./rooms/rooms.component";
import {RoomEditComponent} from "./rooms/room-edit/room-edit.component";
import {RoomListComponent} from "./rooms/room-list/room-list.component";
import {TaskListComponent} from "./tasks/task-list/task-list.component";
import {TaskEditComponent} from "./tasks/task-edit/task-edit.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full'},
  { path: 'tasks', component: TasksComponent, children: [
      {path: '', component: TaskListComponent},
      {path: 'new', component: TaskEditComponent}
    ]},
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
