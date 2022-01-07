import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Validation from 'src/app/utils/validation';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group(
      {
        first_name: ['', Validators.required],
        last_name: ['', [Validators.required]],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        password2: ['', [Validators.required]],
      },
      Validation.match('password', 'password2')
    );
  }

  get form(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.valid) {
      this.authService.register(this.registrationForm.value).subscribe(
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
