import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private userSub!: Subscription;
  isAuthenticated: boolean = false;
  username: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSub = this.authService.loggedUser.subscribe((user) => {
      if (!!user) {
        this.isAuthenticated = true;
        this.username = user.username;
      } else {
        this.isAuthenticated = false;
        this.username = '';
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
