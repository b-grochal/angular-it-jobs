import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/models/job';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.css'],
})
export class ApplicationPageComponent implements OnInit {
  job!: Job;

  constructor(
    private activatedRoute: ActivatedRoute,
    private jobsService: JobsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getJob();
  }

  getJob(): void {
    const id = String(this.activatedRoute.snapshot.paramMap.get('id'));
    this.jobsService.getJobDetails(id).subscribe(
      (job: Job) => {
        this.job = job;
        console.log(this.job);
      },
      (error: string) => {
        console.log(error);
      }
    );
  }
}
