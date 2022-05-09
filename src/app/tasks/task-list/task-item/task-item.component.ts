import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html'
})
export class TaskItemComponent {
  @Input('taskItem') task: Task;
  @Input() index: number;
}
