import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../model/subject';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private baseUrl = 'http://localhost:8080/api/v1/subject'; // Update with your Spring Boot server URL

  constructor(private http: HttpClient) {}

  createNewSubject(subject: Subject): Observable<any> {
    const url = `${this.baseUrl}/add-subject`;
    return this.http.post(url, subject);
  }

  getSubjects(): Observable<Subject[]> {
    const url = `${this.baseUrl}/list-subjects`;
    return this.http.get<Subject[]>(url);
  }

  updateSubject(subject: any): Observable<any> {
    const url = `${this.baseUrl}/update/${subject.subjectId}`;
    return this.http.put(url, subject);
  }

  deleteSubject(id: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete(url);
  }

  getSubjectById(subjectId: number): Observable<Subject> {
    return this.http.get<Subject>(
      `${this.baseUrl}/findsubjectbyid/${subjectId}`
    );
  }
}
