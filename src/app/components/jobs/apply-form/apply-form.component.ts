import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-apply-form',
  templateUrl: './apply-form.component.html',
  styleUrls: ['./apply-form.component.css'],
})
export class ApplyFormComponent implements OnInit {
  applyForm!: FormGroup;
  submitted = false;
  @Input() jobId: any;

  constructor(
    private formBuilder: FormBuilder,
    private jobsService: JobsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.applyForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      city_of_residence: ['', [Validators.required]],
      country_of_residence: ['', [Validators.required]],
      personal_description: ['', [Validators.required]],
    });
    console.log(this.jobId);
  }

  get form(): { [key: string]: AbstractControl } {
    return this.applyForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    const id = String(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.applyForm.valid) {
      this.jobsService.apply(id, this.applyForm.value).subscribe(
        (result: any) => {
          this.router.navigate(['home']);
        },
        (error: string) => {
          console.log('Error');
        }
      );
    }
  }
}
