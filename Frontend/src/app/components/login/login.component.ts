import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private jwtService: JwtService, private router: Router) {}

  login(): void {
    this.jwtService
      .login({ email: this.email, password: this.password })
      .subscribe(
        (response) => {
          if (response.jwtToken) {
            // Make sure this matches the key sent from backend
            this.jwtService.saveToken(response.jwtToken);
            const decodedToken = JSON.parse(
              atob(response.jwtToken.split('.')[1])
            );
            const roles: string[] = decodedToken.roles; // Assuming roles are stored in an array
            if (roles.includes('ADMIN')) {
              this.router.navigate(['/dashboard']);
            } else if (roles.includes('USER')) {
              this.router.navigate(['/']);
            } else {
              this.router.navigate(['/login'], {
                queryParams: { error: 'unauthorized' },
              });
            }
          } else {
            console.error('JWT token is missing in the response body');
          }
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
  }
}
