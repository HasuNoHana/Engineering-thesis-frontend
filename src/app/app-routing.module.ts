import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksComponent} from "./tasks/tasks.component";
import {RoomsComponent} from "./rooms/rooms.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full'},
  { path: 'tasks', component: TasksComponent},
  { path: 'rooms', component: RoomsComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
