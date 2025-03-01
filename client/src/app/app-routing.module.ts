import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/homepage/homepage.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './services/auth-guard.service';
import { CreateTaskComponent } from './components/create-task/create-task.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "tasks", component: TasksComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  {path: "create-task", component: CreateTaskComponent, canActivate: [AuthGuard]},
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
