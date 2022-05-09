import {Injectable} from "@angular/core";
import {Task} from "./task.model";
import {Subject} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService{

  tasksChanged = new Subject<Task[]>();
  private tasks: Task[] = [
    new Task(1,'zmywanie'),
    new Task(2,'pranie')
  ];

  constructor(private http: HttpClient) {
  }

  getTasks(){
    this.http.get<{ [key: number]: Task }>('http://localhost:8080/api/tasks',
    ).subscribe((tasks: any) => {
      console.log(tasks);
    });
    return this.tasks.slice();
  }
}
