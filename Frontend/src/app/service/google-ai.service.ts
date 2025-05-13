import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleAiService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  generateStory(text: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const apiKey = "AIzaSyDbgafZmuU4bepkNwjTf93H-kctPfZv6Bk";

    const params = { key: apiKey };
    const body = {
      contents: [
        {
          parts: [
            {
              text: text
            }
          ]
        }
      ]
    };

    return this.http.post<any>(this.apiUrl, body, { headers, params });
  }

  // ... other service methods
}

