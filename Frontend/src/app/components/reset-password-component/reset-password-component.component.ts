import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-reset-password-component',
  templateUrl: './reset-password-component.component.html',
  styleUrls: ['./reset-password-component.component.css'],
})
export class ResetPasswordComponentComponent implements OnInit {
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private jwtService: JwtService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    this.verifyToken();
  }

  verifyToken(): void {
    this.jwtService.verifyResetToken(this.token).subscribe(
      () => {
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Invalid or expired reset link';
        console.error('Invalid or expired token:', error);
      }
    );
  }

  resetPassword(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.jwtService.resetPassword(this.token, this.newPassword).subscribe(
      () => {
        this.successMessage = 'Password updated successfully';
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        this.errorMessage = 'Failed to update password. Please try again.';
        console.error('Error updating password:', error);
      }
    );
  }
}
