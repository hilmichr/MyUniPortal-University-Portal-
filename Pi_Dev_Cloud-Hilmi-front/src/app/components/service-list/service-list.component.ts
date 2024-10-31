import { Component } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
})
export class ServiceListComponent {
  allService: any;
  constructor(private serviceService: ServiceService) {}
  ngOnInit() {
    this.getAllService();
  }
  getAllService() {
    this.serviceService.getServices().subscribe(
      (res) => {
        console.log(res);
        this.allService = res;
      },
      (error) => {
        console.log('Error while fetching Service');
      }
    );
  }

  deleteService(id: number) {
    if (confirm('Voulez-vous supprimer Service ?')) {
      this.serviceService.deleteService(id).subscribe(
        (res) => {
          console.log(res);
          this.ngOnInit();
        },
        (error) => {
          console.log('Error while fetching Service');
        }
      );
    }
  }
}
