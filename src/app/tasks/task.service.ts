import {Injectable} from "@angular/core";
import {Task} from "./task.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService{

  tasksChanged = new Subject<Task[]>();
  private tasks: Task[] = [
    new Task(1,'zmywanie'),
    new Task(2,'pranie')
  ];


  getTasks() {
    return this.tasks.slice();
  }
}
