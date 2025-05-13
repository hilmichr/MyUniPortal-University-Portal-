import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent {
  userForm!: FormGroup;
  userId = this.activatedRoute.snapshot.params['id'];
  UserData: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: JwtService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      idUser: [null, ''],
      usernam: [null, [Validators.required]],
      userlastname: [null, [Validators.required]],
      useremail: [null, ''],
      useretat: [null, ''],
      usertelephone: [null, [Validators.required]],
      userdate_birth: [null, [Validators.required]],
      usernationaliter: [null, [Validators.required]],
      usergenderr: [null, [Validators.required]],
      password: [null, ''],
      rle: [null, [Validators.required]],
    });
    this.getUserById();
  }

  getUserById() {
    this.userService.getUserById(this.userId).subscribe(
      (res) => {
        this.userForm.patchValue(res);
        this.UserData = res;
      },
      (error) => {
        console.log('User not found');
      }
    );
  }

  updateUser() {
    const data = this.userForm.value;
    console.log(data);

    this.userService.updateUser(data).subscribe(
      (res) => {
        console.log('Your post was modifyed successfully', 'Ok');
        this.router.navigateByUrl('/dashboard/all-users');
      },
      (error) => {
        console.log('Error modifyed the post', 'Ok');
      }
    );
  }
}
