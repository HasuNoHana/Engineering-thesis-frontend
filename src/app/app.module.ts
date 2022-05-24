import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {TasksComponent} from './tasks/tasks.component';
import {TaskListComponent} from './tasks/task-list/task-list.component';
import {AppRoutingModule} from "./app-routing.module";
import {HeaderComponent} from './header/header.component';
import {DropdownDirective} from "./shared/dropdown.directive";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TaskService} from "./tasks/task.service";
import {RoomsComponent} from './rooms/rooms.component';
import {RoomListComponent} from './rooms/room-list/room-list.component';
import {RoomEditComponent} from './rooms/room-edit/room-edit.component';
import {TaskEditComponent} from './tasks/task-edit/task-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskListComponent,
    HeaderComponent,
    DropdownDirective,
    RoomsComponent,
    RoomListComponent,
    RoomEditComponent,
    TaskEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
