import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TaskService} from "../task.service";

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html'
})
export class TaskEditComponent implements OnInit {

  taskForm: FormGroup;
  id: number;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.initForm();
    })
  }

  onSubmit() {
    this.taskService.addTask(this.taskForm.value);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let taskName = '';
    let taskPrice = '';

    this.taskForm = new FormGroup({
      'name': new FormControl(taskName, Validators.required),
      'price': new FormControl(taskPrice, Validators.required)//TODO dodaj ograniczenie ze cena jest wiksza niz 0
    });
  }
}
