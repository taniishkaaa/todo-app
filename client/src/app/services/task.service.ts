import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs";
import { catchError, first } from "rxjs/operators";

import { Task } from "../models/Task";
import { User } from "../models/User";
import { ErrorHandlerService } from "./error-handler.service";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private url = "http://localhost:3000/task";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(userId: User["id"]): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${this.url}?userId=${userId}`, { responseType: "json" })
      .pipe(
        catchError(this.errorHandlerService.handleError<Task[]>("fetchAll", []))
      );
  }  

  createTask(
    formData: Partial<Task>,
    userId: User["id"]
  ): Observable<Task> {
    return this.http
      .post<Task>(
        this.url,
        { title: formData.title, body: formData.body, user: userId },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<Task>("createTask"))
      );
  }

  deleteTask(taskId: Task["id"]): Observable<{}> {
    return this.http
      .delete<Task>(`${this.url}/${taskId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Task>("deleteTask"))
      );
  }

  fetchTask(taskId: Task["id"]): Observable<Task> {
    return this.http
      .get<Task>(`${this.url}/${taskId}`, { responseType: "json" })
      .pipe(
        catchError(this.errorHandlerService.handleError<Task>("fetchTask"))
      );
  }

  editTask(taskId: Task["id"], updatedTask: Partial<Task>): Observable<Task> {
    return this.http
      .put<Task>(`${this.url}/${taskId}`, updatedTask, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Task>("editTask"))
      );
  }
   
}
