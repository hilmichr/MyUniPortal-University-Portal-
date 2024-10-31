import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import { RessourcesService } from 'src/app/service/ressources.service';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent {
  serviceId = this.activatedRoute.snapshot.params['id'];
  serviceData: any;
  ressourcesData: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private servicesService: ServiceService,
    private ressourcesService: RessourcesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getServiceById();
    this.getRessourcesByServiceId();
  }
  downloadFile(file: any, name: any) {
    saveAs(file, name);
  }

  getServiceById() {
    this.servicesService.getServicesById(this.serviceId).subscribe(
      (res) => {
        this.serviceData = res;
        console.log(res);
      },
      (error) => {
        console.log('Service not found');
      }
    );
  }

  getRessourcesByServiceId() {
    this.ressourcesService.getRessourcesByService(this.serviceId).subscribe(
      (res) => {
        this.ressourcesData = res;
        console.log(res);
      },
      (error) => {
        console.log('Service not found');
      }
    );
  }
}
