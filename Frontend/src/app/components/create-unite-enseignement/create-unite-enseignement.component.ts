import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UniteEnseignementService } from 'src/app/service/unite-enseignement.service';

@Component({
  selector: 'app-create-unite-enseignement',
  templateUrl: './create-unite-enseignement.component.html',
  styleUrls: ['./create-unite-enseignement.component.css'],
})
export class CreateUniteEnseignementComponent {
  @ViewChild('tagInput') tagInputRef!: ElementRef;
  uniteEnseignementForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private uniteEnseignementService: UniteEnseignementService
  ) {}

  ngOnInit() {
    this.uniteEnseignementForm = this.fb.group({
      nom: [null, Validators.required],
    });
  }

  createUniteEnseignement() {
    const data = this.uniteEnseignementForm.value;

    this.uniteEnseignementService.addUniteEnseignement(data).subscribe(
      (res) => {
        console.log('Your Unite Enseignement was created successfully', 'Ok');
        this.router.navigateByUrl('/dashboard/all-unite-enseignement');
      },
      (error) => {
        console.log('Error creating the Unite Enseignement', 'Ok');
      }
    );
  }
}
