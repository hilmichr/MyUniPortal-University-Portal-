import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any = {
    usernam: '',
    userlastname: '',
    useremail: '',
    usertelephone: '',
    userdate_birth: '',
    usernationaliter: '',
    usergenderr: '',
  };

  constructor(private jwtService: JwtService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const decodedToken = this.jwtService.decodeToken();
    const email = decodedToken ? decodedToken.sub : '';
    if (email) {
      this.jwtService.getUserProfile(email).subscribe(
        (profile) => {
          this.user = profile;
        },
        (error) => {
          console.error('Failed to load user profile:', error);
        }
      );
    }
  }
}
