import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NavigationComponent } from './components/navigation/navigation.component';
import { SignupComponent } from './components/signup/signup.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { HomeComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { AuthInterceptorService } from "./services/auth-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    SignupComponent,
    TasksComponent,
    HomeComponent,
    CreateTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    ReactiveFormsModule,
    NoopAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
