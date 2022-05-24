import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TaskService} from "../task.service";
import {Task} from "../task.model";

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  taskForm: FormGroup;
  editMode = false;
  index: number;
  editTableToDo: boolean;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.index = +params['index'];
      this.editTableToDo = this.router.url.includes('todo');
      this.editMode = params['index'] != null;
      this.initForm();
    })
  }

  onSubmit() {
    if(this.editMode) {
      if(this.editTableToDo) {
        this.taskService.updateToDoTask(this.index, this.taskForm.value);
      } else {
        this.taskService.updateDoneTask(this.index, this.taskForm.value);
      }
    } else {
      this.taskService.addTask(this.taskForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    console.log(this.taskForm);
    if(this.editMode) {
      this.editMode = false;
      this.router.navigate(['../../'], {relativeTo: this.route});
    } else {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  private initForm() {
    let taskName = '';
    let taskPrice: number = 0;

    if(this.editMode) {
      let task: Task;
      if(this.editTableToDo) {
        task = this.taskService.getTaskFromToDo(this.index);
      } else {
        task = this.taskService.getTaskFromDone(this.index);
      }
      taskName = task.name;
      taskPrice = task.price;
    }

    this.taskForm = new FormGroup({
      'name': new FormControl(taskName, Validators.required),
      'price': new FormControl(taskPrice,
        [Validators.required, Validators.min(1)])
    });
  }

  get getTaskFormNameControl() {return this.taskForm.get('name') as FormControl;}
}
