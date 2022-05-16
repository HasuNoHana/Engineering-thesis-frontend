import {Injectable} from "@angular/core";
import {Task} from "./task.model";
import {map, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasksChanged = new Subject<Task[]>();
  private tasks: Task[];

  constructor(private http: HttpClient) {
  }

  fetchTasks() {
    return this.http.get<{ [key: string]: Task }>('http://localhost:8080/api/tasks')
      .pipe(map(responseData => {
        const taskArray: Task[] = [];
        console.log(responseData);
        console.log(responseData[0]);
        return responseData;
      }));
  }
}
