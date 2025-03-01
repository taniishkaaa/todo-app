import { Component, OnInit, ViewChild } from "@angular/core";

import { Observable } from "rxjs";

import { TaskService } from "../../services/task.service";
import { AuthService } from "../../services/auth.service";

import { Task } from "../../models/Task";
import { User } from "../../models/User";
import { CreateTaskComponent } from "../create-task/create-task.component";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
  standalone: false
})
export class TasksComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  userId!: User["id"];
  @ViewChild(CreateTaskComponent) createTaskComponent!: CreateTaskComponent;

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.userId;
    this.tasks$ = this.fetchAll(this.userId);
  }

  fetchAll(userId: User["id"]): Observable<Task[]> {
    return this.taskService.fetchAll(userId);
  }

  createTask(): void {
    this.tasks$ = this.fetchAll(this.userId);
  }

  delete(taskId: Task["id"]): void {
    this.taskService
      .deleteTask(taskId)
      .subscribe(() => (this.tasks$ = this.fetchAll(this.userId)));
  }

  edit(taskId: Task["id"]): void {
    this.createTaskComponent.isOpen = true;
    this.createTaskComponent.isEditMode = true;
    this.taskService
      .fetchTask(taskId)
      .subscribe((task) => {
        this.createTaskComponent.populateForm(taskId, task);
      })
  }  
}
