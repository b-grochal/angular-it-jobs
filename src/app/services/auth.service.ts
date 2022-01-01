import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { LoggedUser } from '../models/logged-user';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedUser = new BehaviorSubject<LoggedUser | null>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelperService: JwtHelperService
  ) {}

  login(formData: any) {
    return this.http
      .post<LoginResponse>('http://127.0.0.1:8000/api/jobs/', formData)
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleLogin(responseData.access);
        })
      );
  }

  private handleLogin(token: string) {
    const expirationDate =
      this.jwtHelperService.getTokenExpirationDate(token) ?? new Date();
    const username = this.jwtHelperService.decodeToken(token)['username'];
    const loggedUser = new LoggedUser(username, token, expirationDate);
    const tokenExpirationDuration = Math.abs(
      new Date().getTime() - expirationDate.getTime()
    );
    this.loggedUser.next(loggedUser);
    this.autoLogout(tokenExpirationDuration);
    localStorage.setItem('loggedUserData', JSON.stringify(loggedUser));
  }

  autoLogin() {
    const loggedUserData: {
      username: string;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('loggedUserData') ?? '');
    if (!loggedUserData) {
      return;
    }

    const loadedUser = new LoggedUser(
      loggedUserData.username,
      loggedUserData._token,
      new Date(loggedUserData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.loggedUser.next(loadedUser);
      const expirationDuration =
        new Date(loggedUserData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.loggedUser.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('loggedUserData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(
        'An error occurred! Try again later of contact with the support.'
      );
    }
    return throwError(errorResponse.error.error);
  }
}
