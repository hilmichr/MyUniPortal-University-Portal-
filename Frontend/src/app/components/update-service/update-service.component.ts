import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import { SubjectService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.component.html',
  styleUrls: ['./update-service.component.css'],
})
export class UpdateServiceComponent {
  serviceForm!: FormGroup;
  serviceId = this.activatedRoute.snapshot.params['id'];
  allSubject: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private serviceService: ServiceService,
    private activatedRoute: ActivatedRoute,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.serviceForm = this.fb.group({
      serviceId: [undefined],
      serviceName: [null, Validators.required],
      serviceDescription: [null, Validators.required],
      subject: [null, Validators.required],
    });
    this.getServiceById();
    this.getAllSubject();
  }

  getServiceById() {
    this.serviceService.getServicesById(this.serviceId).subscribe(
      (res) => {
        this.serviceForm.patchValue(res);
      },
      (error) => {
        console.log('Service not found');
      }
    );
  }
  getAllSubject() {
    this.subjectService.getSubjects().subscribe(
      (res) => {
        console.log(res);
        this.allSubject = res;
      },
      (error) => {
        console.log('Error while fetching Subject');
      }
    );
  }

  updateService() {
    const data = {
      serviceId: this.serviceForm.value.serviceId,
      serviceName: this.serviceForm.value.serviceName,
      serviceDescription: this.serviceForm.value.serviceDescription,
      subject: {
        subjectId: this.serviceForm.value.subject,
      },
    };

    this.serviceService.updateService(data).subscribe(
      (res) => {
        console.log('Your Service was modifyed successfully', 'Ok');
        this.router.navigateByUrl('/dashboard/all-service');
      },
      (error) => {
        console.log('Error modifyed the Service', 'Ok');
      }
    );
  }
}
