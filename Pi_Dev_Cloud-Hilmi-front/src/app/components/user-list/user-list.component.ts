import { Component } from '@angular/core';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  allUsers: any;
  constructor(private jwtService: JwtService) {}
  ngOnInit() {
    this.getAllUser();
  }
  getAllUser() {
    this.jwtService.getAllUser().subscribe(
      (res) => {
        console.log(res);
        this.allUsers = res;
      },
      (error) => {
        console.log('Error while fetching users');
      }
    );
  }
  onChange(id: number, etat: boolean) {
    console.log(id);
    console.log(etat);
    this.jwtService.modifyEtatUser(id, etat).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log('Error while fetching change etat');
      }
    );
  }

  deleteUser(id: number) {
    if (confirm('Voulez-vous supprimer utilisateur ?')) {
      this.jwtService.deleteUser(id).subscribe(
        (res) => {
          console.log(res);
          this.ngOnInit();
        },
        (error) => {
          console.log('Error while fetching users');
        }
      );
    }
  }
}
