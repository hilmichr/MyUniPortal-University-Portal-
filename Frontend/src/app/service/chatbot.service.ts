import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private apiUrl = 'http://localhost:8080/api/chat/response';

  constructor(private http: HttpClient) {}

  getChatbotResponse(question: string): Observable<string> {
    const params = { question };
    return this.http.get(this.apiUrl, { params, responseType: 'text' }).pipe(
      catchError((error: any) => {
        // Handle errors here if needed
        console.error('Error occurred:', error);
        throw error;
      })
    );
  }
}
