import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  createNewComment(articleId: number, content: string): Observable<any> {
    const params = {
      articleId: articleId,
    };
    return this.http.post(BASIC_URL + `api/comment/create`, content, {
      params,
    });
  }

  createNewCommentReply(
    articleId: number,
    content: string,
    commentId: number
  ): Observable<any> {
    const params = {
      articleId: articleId,
      parentCommentId: commentId,
    };
    return this.http.post(BASIC_URL + `api/comment/createReplay`, content, {
      params,
    });
  }

  getCommentsByArticleId(articleId: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/comment/getByArticleId/${articleId}`);
  }
}
