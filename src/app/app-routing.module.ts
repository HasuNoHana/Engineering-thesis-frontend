import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksComponent} from "./tasks/tasks.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full'},
  { path: 'tasks', component: TasksComponent,},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
