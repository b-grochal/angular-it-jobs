import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Job } from 'src/app/models/job';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-job-details-page',
  templateUrl: './job-details-page.component.html',
  styleUrls: ['./job-details-page.component.css'],
})
export class JobDetailsPageComponent implements OnInit {
  job!: Job;

  constructor(
    private activatedRoute: ActivatedRoute,
    private jobsService: JobsService
  ) {}

  ngOnInit(): void {
    this.getJob();
  }

  getJob(): void {
    const id = String(this.activatedRoute.snapshot.paramMap.get('id'));
    this.jobsService.getJobDetails(id).subscribe(
      (job: Job) => {
        this.job = job;
      },
      (error: string) => {
        console.log(error);
      }
    );
  }
}
