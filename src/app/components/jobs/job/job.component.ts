import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Job } from 'src/app/models/job';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
})
export class JobComponent implements OnInit {
  @Input() job: any;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onJobDetails(): void {
    this.router.navigate(['jobs', this.job.id]);
  }
}
