import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  genres: string[] = ['male', 'female'];

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      usernam: ['', [Validators.required]],
      userlastname: ['', [Validators.required]],
      useremail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      usertelephone: ['', [Validators.required]],
      userdate_birth: ['', [Validators.required]],
      usergenderr: ['', [Validators.required]],
      usernationaliter: ['', [Validators.required]],
    });
  }

  submitForm() {
    if (this.registerForm.valid) {
      const user = {
        ...this.registerForm.value,
        rle: 'USER',
        useretat: true,
      };

      console.log('Submitting user:', user); // Log the data being sent

      this.service.register(user).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          const userEmail = this.registerForm.get('useremail')?.value;
          this.router.navigate(['/verify'], {
            queryParams: { email: userEmail },
          });
        },
        error: (error) => {
          console.error('Failed to register user:', error);
        },
      });
    } else {
      console.error('Form is not valid:', this.registerForm.errors);
    }
  }
}
