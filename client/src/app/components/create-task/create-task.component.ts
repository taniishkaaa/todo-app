import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormControl, FormGroup, Validators, NgForm } from "@angular/forms";

import { first } from "rxjs/operators";

import { Task } from "../../models/Task";

import { AuthService } from "../../services/auth.service";
import { TaskService } from "../../services/task.service";
import { User } from "../../models/User";

@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.css"],
  standalone: false
})
export class CreateTaskComponent implements OnInit {
  @ViewChild("formDirective")
  formDirective!: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();

  form!: FormGroup;

  isOpen = false;
  isEditMode = false;
  taskId!: Task["id"]; 

  constructor(
    private authService: AuthService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.form = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
      body: new FormControl("", [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  onSubmit(formData: Pick<Task, "title" | "body">): void {
    if(this.isEditMode) {
      this.taskService
        .editTask(this.taskId, formData)
        .pipe(first())
        .subscribe(() => {
          this.create.emit(null);
        });
      this.isOpen = false;
      this.isEditMode = false;
    } else {
      this.taskService
    .createTask(formData, this.authService.userId as User["id"])
      .pipe(first())
      .subscribe(() => {
        this.create.emit(null);
      });
    }
    this.form.reset();
    this.formDirective.resetForm();
  }

  populateForm(taskId: Task["id"], formData: Pick<Task, "title" | "body">): void {
    this.form.patchValue({
      title: formData.title,
      body: formData.body
    });
    this.taskId = taskId;
  }
}
