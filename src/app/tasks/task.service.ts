import {Injectable} from "@angular/core";
import {Task} from "./task.model";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TaskDto} from "./taskDto.model";

@Injectable()
export class TaskService {

  toDoTasksChanged = new Subject<Task[]>();
  doneTasksChanged = new Subject<Task[]>();
  toDoTasksForRoomIdChanged = new Subject<Task[]>();
  doneTasksForRoomIdChanged = new Subject<Task[]>();
  tasksChanged = new Subject<Task[]>();
  private toDoTasks: Task[] = [];
  private doneTasks: Task[] = [];
  private tasks: Task[] = [];
  private roomId: number;

  constructor(private http: HttpClient) {
    this.fetchTasks();
  }

  fetchTasks() {
    this.fetchTasksCall().subscribe((tasks: Task[]) => {
        this.tasks = tasks;
        this.toDoTasks = this.tasks.filter(task => !task.done);
        this.doneTasks = this.tasks.filter(task => task.done);
        this.tasksChanged.next(this.tasks.slice());
        this.toDoTasksChanged.next(this.toDoTasks.slice());
        this.doneTasksChanged.next(this.doneTasks.slice());
        if(this.roomId){
          this.toDoTasksForRoomIdChanged.next(this.toDoTasks.filter(task => task.room.id === this.roomId).slice());
          this.doneTasksForRoomIdChanged.next(this.doneTasks.filter(task => task.room.id === this.roomId).slice());
        }
      });
  }

  addTask(task: Task) {
    let taskDto: TaskDto = new TaskDto(task.name, task.initialPrice, task.room.id, task.done);
    this.addTaskCall(taskDto).subscribe((_: Task) => {
        this.fetchTasks()
      });
  }

  updateTask(taskId: number, updatedTask: Task) {
    let taskDto: TaskDto = new TaskDto(updatedTask.name, updatedTask.initialPrice, updatedTask.room.id, updatedTask.done);
    this.updateTaskCall(taskId, taskDto).subscribe((_: Task) => {
      this.fetchTasks();
    });
  }

  deleteTask(taskId: number) {
    this.deleteTaskCall(taskId).subscribe(( _: any) => {
      this.fetchTasks();
    });
  }

  makeTaskDone(taskId: number) {
    this.makeTaskDoneCall(taskId).subscribe((_: any) => {
        this.fetchTasks();
      });
  }

  makeTaskToDo(taskId: number) {
    this.makeTaskToDoCall(taskId).subscribe((_: any) => {
        this.fetchTasks();
      });
  }



  fetchTasksCall(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:4200/api/tasks', {withCredentials: true});
  }

  addTaskCall(taskDto: TaskDto) {
    return this.http.post<Task>('http://localhost:4200/api/addTask', taskDto, {withCredentials: true});
  }

  deleteTaskCall(taskId: number) {
    return this.http.delete('http://localhost:4200/api/task?id=' + taskId, {withCredentials: true});
  }

  makeTaskDoneCall(taskId: number) {
    return this.http.post('http://localhost:4200/api/makeTaskDone?id=' + taskId, {withCredentials: true});
  }

  makeTaskToDoCall(taskId: number) {
    return this.http.post('http://localhost:4200/api/makeTaskToDo?id=' + taskId, {withCredentials: true});
  }

  updateTaskCall(taskId: number, taskDto: TaskDto) {
    return this.http.post<Task>('http://localhost:4200/api/updateTask?id=' + taskId, taskDto, {withCredentials: true});
  }



  getTasksToDoForRoom(roomId: number) {
    this.roomId = roomId;
    return this.toDoTasks.filter(task => task.room.id === roomId).slice();
  }

  getTasksDoneForRoom(roomId: number) {
    this.roomId = roomId;
    return this.doneTasks.filter(task => task.room.id === roomId).slice();
  }

  getToDoTasks(){
    return this.toDoTasks.slice();
  }

  getDoneTasks(){
    return this.doneTasks.slice();
  }

  getTask(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

}
