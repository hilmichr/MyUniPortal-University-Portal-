import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Adjust the path as needed
import { Service } from '../model/service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private baseUrl = 'http://localhost:8080/api/v1/service'; // Update with your Spring Boot server URL

  constructor(private http: HttpClient) {}

  getServices(): Observable<Service[]> {
    const url = `${this.baseUrl}/listservices`;
    return this.http.get<Service[]>(url);
  }

  addNewService(service: any, serviceImage: any): Observable<any> {
    const formData = new FormData();
    formData.append('service', JSON.stringify(service));
    formData.append('serviceImage', serviceImage);
    const url = `${this.baseUrl}/addservice`;
    return this.http.post(url, formData);
  }

  updateService(service: any): Observable<any> {
    const url = `${this.baseUrl}/updateservice/${service.serviceId}`;
    return this.http.put(url, service);
  }

  deleteService(id: number): Observable<any> {
    const url = `${this.baseUrl}/deleteservice/${id}`;
    return this.http.delete(url);
  }

  getServicesBySubjectId(subjectId: number): Observable<Service[]> {
    const url = `${this.baseUrl}/getservicesbysubjectid/${subjectId}`;
    return this.http.get<Service[]>(url);
  }

  getServicesById(subjectId: number): Observable<Service[]> {
    const url = `${this.baseUrl}/getservicebyid/${subjectId}`;
    return this.http.get<Service[]>(url);
  }
  getTrending(): Observable<Service[]> {
    const url = `${this.baseUrl}/trending`;
    return this.http.get<Service[]>(url);
  }
}
