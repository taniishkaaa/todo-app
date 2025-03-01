import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
  standalone: false
})
export class NavigationComponent implements OnInit {
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isUserLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isAuthenticated = isLoggedIn;
    });
  }

  logout(): void {
    localStorage.removeItem("token");
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate(["login"]);
  }
}
