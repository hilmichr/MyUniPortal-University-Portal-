import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient) {}

  createNewPost(article: any, blogImage: File): Observable<any> {
    const formData = new FormData();
    formData.append('article', JSON.stringify(article));
    formData.append('blogImage', blogImage);
    return this.http.post(`${BASIC_URL}api/article`, formData);
  }

  getAllArticles(page: number): Observable<any> {
    console.log(page);
    return this.http.get(BASIC_URL + `api/article?page=${page}`);
  }

  getArticleById(articleId: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/article/${articleId}`);
  }
  getPopularArticles(): Observable<any> {
    return this.http.get(BASIC_URL + `api/article/get-popular-article`);
  }
  deleteArticle(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + `api/article/remove/${id}`);
  }

  updatePost(article: any): Observable<any> {
    return this.http.put(`${BASIC_URL}api/article/modify-article`, article);
  }

  statArticle(): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}api/article/stat`);
  }
}
