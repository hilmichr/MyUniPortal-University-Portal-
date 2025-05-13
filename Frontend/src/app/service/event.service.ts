import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image } from '../model/Image';
const BASIC_URL = 'http://127.0.0.1:8080';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiServer: string = 'http://127.0.0.1:8080/api/evenement/';
  private baseURL: string = 'http://127.0.0.1:8080/api/evenement/get';
  __URL = 'http://127.0.0.1:8080/api/Event/cloudinary';
  message: string = '';
  private BASIC_URL_DATAOBJECT = `${BASIC_URL}/api/dataobject`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private _http: HttpClient) {}

  getAllEvent(): Observable<Event[]> {
    return this._http.get<Event[]>(this.apiServer + 'getAll', this.httpOptions);
  }

  deleteEvent(id: number) {
    const url = `${this.apiServer}delete/${id}`;
    return this._http.delete(url, this.httpOptions);
  }

  addEvent(event: any) {
    return this._http.post<Event>(
      this.apiServer + 'add',
      event,
      this.httpOptions
    );
  }

  updateEvent(event: any) {
    return this._http.put<any>(
      this.apiServer + 'update',
      event,
      this.httpOptions
    );
  }

  getEvent(idEvent: number): Observable<Event> {
    const url = `${this.apiServer + 'get'}/${idEvent}`;
    return this._http.get<Event>(url, this.httpOptions);
  }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append(this.apiServer + 'file', file, file.name);
    return this._http.post('upload', formData);
  }

  getDataObjectStatistics(): Observable<any> {
    return this._http.get<any>(`${this.BASIC_URL_DATAOBJECT}/statistics`);
  }

  //-------------------------------- ------------------------------
  //--------------------------------Image related URLS ------------------------------
  public list(): Observable<Image[]> {
    return this._http.get<Image[]>(this.__URL + '/list');
  }
  public imagesForEvent(eventId: number): Observable<Image[]> {
    return this._http.get<Image[]>(this.__URL + '/list/' + eventId);
  }

  public uploadForEvent(image: File, eventId: number): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', image);
    return this._http.post<any>(this.__URL + '/upload/' + eventId, formData);
  }
  public upload(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', image);
    return this._http.post<any>(this.__URL + '/upload', formData);
  }

  /*public delete(id: any): Observable<any> {
    return this._http.delete<any>(this.__URL + /delete/${id});
  }*/
  //-------------------------------------------------------------
}
