import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-verifpassword',
  templateUrl: './verifpassword.component.html',
  styleUrls: ['./verifpassword.component.css'],
})
export class VerifpasswordComponent implements OnInit {
  email: string = '';
  verificationCode: string = '';

  constructor(
    private jwtService: JwtService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Extract email from query parameters
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || '';
      if (this.email) {
        this.sendVerificationEmail();
      }
    });
  }

  sendVerificationEmail() {
    this.jwtService.sendVerificationCode(this.email).subscribe({
      next: (response) => {
        console.log('Verification email sent successfully', response);
      },
      error: (error) => {
        console.error('Failed to send verification email', error);
      },
    });
  }

  verifyCode() {
    this.jwtService.verifyCode(this.email, this.verificationCode).subscribe({
      next: (response) => {
        console.log('Verification successful', response);
        alert('Verification successful!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Verification failed', error);
        alert('Verification failed. Please check the code and try again.');
      },
    });
  }
}
