import { Component } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { SubjectService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
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
  getTrending() {
    this.serviceService.getTrending().subscribe(
      (res) => {
        console.log(res);
        this.allService = res;
      },
      (error) => {
        console.log('Error while fetching Service');
      }
    );
  }
}
