import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { JobsPageComponent } from './pages/jobs-page/jobs-page.component';
import { JobDetailsPageComponent } from './pages/job-details-page/job-details-page.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { RegistrationFormComponent } from './components/auth/registration-form/registration-form.component';
import { JobComponent } from './components/jobs/job/job.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ApplicationPageComponent } from './pages/application-page/application-page.component';
import { ApplyFormComponent } from './components/jobs/apply-form/apply-form.component';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    JobsPageComponent,
    JobDetailsPageComponent,
    HeaderComponent,
    FooterComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    JobComponent,
    ApplicationPageComponent,
    ApplyFormComponent,
    RegistrationPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    AuthGuardGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
