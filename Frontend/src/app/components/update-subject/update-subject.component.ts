import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-update-subject',
  templateUrl: './update-subject.component.html',
  styleUrls: ['./update-subject.component.css'],
})
export class UpdateSubjectComponent {
  subjectForm!: FormGroup;
  subjectId = this.activatedRoute.snapshot.params['id'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private subjectService: SubjectService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subjectForm = this.fb.group({
      subjectId: [undefined],
      subjectName: [null, Validators.required],
    });
    this.getSubjectById();
  }

  getSubjectById() {
    this.subjectService.getSubjectById(this.subjectId).subscribe(
      (res) => {
        this.subjectForm.patchValue(res);
      },
      (error) => {
        console.log('Subject not found');
      }
    );
  }

  updateSubject() {
    const data = this.subjectForm.value;

    this.subjectService.updateSubject(data).subscribe(
      (res) => {
        console.log('Your Subject was modifyed successfully', 'Ok');
        this.router.navigateByUrl('/dashboard/all-subject');
      },
      (error) => {
        console.log('Error modifyed the Subject', 'Ok');
      }
    );
  }
}
