import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationPageComponent } from './pages/application-page/application-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { JobDetailsPageComponent } from './pages/job-details-page/job-details-page.component';
import { JobsPageComponent } from './pages/jobs-page/jobs-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'jobs', component: JobsPageComponent },
  { path: 'jobs/:id', component: JobDetailsPageComponent },
  { path: 'jobs/:id/apply', component: ApplicationPageComponent },
  { path: 'login', component: LoginPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
