import { Component } from '@angular/core';
import { SubjectService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css'],
})
export class SubjectListComponent {
  allSubject: any;
  constructor(private subjectService: SubjectService) {}
  ngOnInit() {
    this.getAllSubject();
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

  deleteSubject(id: number) {
    if (confirm('Voulez-vous supprimer Subject ?')) {
      this.subjectService.deleteSubject(id).subscribe(
        (res) => {
          console.log(res);
          this.ngOnInit();
        },
        (error) => {
          console.log('Error while fetching Subject');
        }
      );
    }
  }
}
