import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBabyStroller } from './interfaces';
import { IComment } from './interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  createComment$(commentData: {postText: string}, id: string): Observable<IComment> {
    return this.httpClient.post<IComment>(`http://localhost:3000/api/stroller/${id}/createPost` , commentData , {withCredentials: true});
  }
}
