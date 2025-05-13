import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectService } from 'src/app/service/subject.service';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css'],
})
export class CreateSubjectComponent {
  subjectForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.subjectForm = this.fb.group({
      subjectName: [null, Validators.required],
    });
  }

  createSubject() {
    const data = this.subjectForm.value;

    this.subjectService.createNewSubject(data).subscribe(
      (res) => {
        console.log('Your subject was created successfully', 'Ok');
        this.router.navigateByUrl('/dashboard/all-subject');
      },
      (error) => {
        console.log('Error creating the subject', 'Ok');
      }
    );
  }
}
