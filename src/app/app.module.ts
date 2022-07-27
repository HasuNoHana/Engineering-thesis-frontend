import {Injectable, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {TasksComponent} from './tasks/tasks.component';
import {TaskListComponent} from './tasks/task-list/task-list.component';
import {AppRoutingModule} from "./app-routing.module";
import {HeaderComponent} from './header/header.component';
import {DropdownDirective} from "./shared/dropdown.directive";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RoomsComponent} from './rooms/rooms.component';
import {RoomListComponent} from './rooms/room-list/room-list.component';
import {RoomEditComponent} from './rooms/room-edit/room-edit.component';
import {TaskEditComponent} from './tasks/task-edit/task-edit.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home-page/home.component';
import {AuthenticationService} from "./login/authentication.service";
import {TaskService} from "./tasks/task.service";
import {OnlyLoggedInUsersGuardService} from "./login/only-logged-in-users-guard.service";
import {ToastComponent} from './toast/toast.component';
import {ToastService} from "./toast/toast.service";

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
    DropdownDirective,
    RoomsComponent,
    RoomListComponent,
    RoomEditComponent,
    TaskEditComponent,
    LoginComponent,
    HomeComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    AuthenticationService,
    TaskService,
    OnlyLoggedInUsersGuardService,
    ToastService,
    {provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
