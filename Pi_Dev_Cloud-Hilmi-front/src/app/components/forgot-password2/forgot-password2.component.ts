import { Component } from '@angular/core';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-forgot-password2',
  templateUrl: './forgot-password2.component.html',
  styleUrls: ['./forgot-password2.component.css'],
})
export class ForgotPassword2Component {
  email: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private jwtService: JwtService) {}
  sendResetLink(): void {
    const appUrl = window.location.origin;
    this.jwtService.sendResetLink(this.email, appUrl).subscribe(
      (response) => {
        this.successMessage = response;
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Error sending reset link. Please try again.';
        console.error('Error sending reset link:', error);
      }
    );
  }
}
