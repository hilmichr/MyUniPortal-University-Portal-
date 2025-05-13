import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UniteEnseignementService } from 'src/app/service/unite-enseignement.service';

@Component({
  selector: 'app-update-ue',
  templateUrl: './update-ue.component.html',
  styleUrls: ['./update-ue.component.css'],
})
export class UpdateUeComponent {
  UniteEnseignementForm!: FormGroup;
  UniteEnseignementId = this.activatedRoute.snapshot.params['id'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private UniteEnseignementService: UniteEnseignementService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.UniteEnseignementForm = this.fb.group({
      id: [null, ''],
      nom: [null, [Validators.required]],
    });
    this.getUniteEnseignementById();
  }

  getUniteEnseignementById() {
    this.UniteEnseignementService.getUniteEnseignementById(
      this.UniteEnseignementId
    ).subscribe(
      (res) => {
        this.UniteEnseignementForm.patchValue(res);
      },
      (error) => {
        console.log('Unite Enseignement not found');
      }
    );
  }

  updateUniteEnseignement() {
    const data = this.UniteEnseignementForm.value;

    this.UniteEnseignementService.modifyUniteEnseignement(data).subscribe(
      (res) => {
        console.log('Your Unite Enseignement was modifyed successfully', 'Ok');
        this.router.navigateByUrl('/dashboard/all-unite-enseignement');
      },
      (error) => {
        console.log('Error modifyed the Unite Enseignement', 'Ok');
      }
    );
  }
}
