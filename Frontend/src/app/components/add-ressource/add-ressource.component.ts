import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RessourcesService } from 'src/app/service/ressources.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-add-ressource',
  templateUrl: './add-ressource.component.html',
  styleUrls: ['./add-ressource.component.css'],
})
export class AddRessourceComponent {
  ressourceForm!: FormGroup;
  allService: any;
  ressourceFile: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ressourceService: RessourcesService,
    private serviceService: ServiceService
  ) {}

  ngOnInit() {
    this.ressourceForm = this.fb.group({
      ressource: [null, Validators.required],
      serviceId: [null, Validators.required],
    });
    this.getAllService();
  }

  uploadRessources() {
    this.ressourceService
      .uploadImage(this.ressourceFile, this.ressourceForm.value.serviceId)
      .subscribe(
        (res) => {
          console.log('Your ressource was created successfully', 'Ok');
          this.router.navigateByUrl('/dashboard/all-ressource');
        },
        (error) => {
          console.log('Error creating the ressource', 'Ok');
        }
      );
  }

  onFileSelected(event: any) {
    console.log('file selected', event.target.files[0]);
    this.ressourceFile = event.target.files[0];
  }

  getAllService() {
    this.serviceService.getServices().subscribe(
      (res) => {
        console.log(res);
        this.allService = res;
      },
      (error) => {
        console.log('Error while fetching Subject');
      }
    );
  }
}
