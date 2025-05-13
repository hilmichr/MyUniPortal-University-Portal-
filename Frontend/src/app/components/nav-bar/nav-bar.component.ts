import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  constructor(public jwtService: JwtService, private router: Router) {}

  ngOnInit() {
    this.roles();
  }

  logout(): void {
    this.jwtService.logout().subscribe(
      () => {
        this.jwtService.clearToken();
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Logout failed', error);
      }
    );
  }

  role: any;

  roles(): void {
    const decodedToken = this.jwtService.decodeToken();
    this.role = decodedToken.roles;
    console.log(this.role);
  }
}
