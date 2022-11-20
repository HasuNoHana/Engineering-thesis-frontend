import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent{

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  onCreateNewTask() {
    this.router.navigate(['tasks','list','new']);
  }
}
