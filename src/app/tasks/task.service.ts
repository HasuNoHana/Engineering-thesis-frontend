import {Injectable} from "@angular/core";
import {Task} from "./task.model";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {HouseService} from "../houses/house.service";
import {HouseBuddy} from "../houses/house-buddy.model";

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

  taskToUserMapChanged = new Subject<Map<number, string>>();
  taskToUserMap: Map<number, string> = new Map();

  constructor(private http: HttpClient,
              private houseService: HouseService) {}

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
    this.addTaskCall(task).subscribe((_: Task) => {
        this.fetchTasks()
      });
  }

  updateTask(updatedTask: Task) {
    this.updateTaskCall(updatedTask).subscribe((_: Task) => {
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
        this.houseService.fetchData();
      });
  }

  makeTaskToDo(taskId: number) {
    this.makeTaskToDoCall(taskId).subscribe((_: any) => {
        this.fetchTasks();
      this.houseService.fetchData();
    });
  }



  fetchTasksCall(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:4200/api/tasks', {withCredentials: true});
  }

  addTaskCall(task: Task) {
    return this.http.post<Task>('http://localhost:4200/api/addTask', task, {withCredentials: true});
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

  updateTaskCall(task: Task) {
    return this.http.post<Task>('http://localhost:4200/api/updateTask', task, {withCredentials: true});
  }



  getTasksToDoForRoom(roomId: number) {
    if(this.tasks.length === 0){
      this.fetchTasks();
    }
    this.roomId = roomId;
    return this.toDoTasks.filter(task => task.room.id === roomId).slice();
  }

  getTasksDoneForRoom(roomId: number) {
    if(this.tasks.length === 0){
      this.fetchTasks();
    }
    this.roomId = roomId;
    return this.doneTasks.filter(task => task.room.id === roomId).slice();
  }

  getToDoTasks(){
    if(this.tasks.length === 0){
      this.fetchTasks();
    }
    return this.toDoTasks.slice();
  }

  getDoneTasks(){
    if(this.tasks.length === 0){
      this.fetchTasks();
    }
    return this.doneTasks.slice();
  }

  getTask(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  getTaskToUserMap() {
    if (this.taskToUserMap.size === 0) {
      this.fetchUsers();
    }
    return this.taskToUserMap;
  }

  private fetchUsers() {
    this.houseService.usersChanged.subscribe((users: HouseBuddy[]) => {
      users.forEach(user => {
        this.taskToUserMap.set(user.id, user.username);
      });
      this.taskToUserMapChanged.next(this.taskToUserMap);
    });
  }
}
