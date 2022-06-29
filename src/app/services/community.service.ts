import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/Post';
import { Business } from '../models/Business';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/Comment';
import { Neighborhood } from '../models/Neighborhood';
import { FlashMessagesService } from 'flash-messages-angular';

@Injectable({
  providedIn: 'root',
})
export class CommunityService {
  url: string = environment.BASE_URL;
  private messageSource: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public message = this.messageSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/posts`);
  }

  createPost(post: any): Observable<Post> {
    return this.http.post<Post>(`${this.url}/posts/`, post);
  }

  searchPosts(term: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/posts/?q=${term}`);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.url}/comments/`, comment);
  }
  createBusiness(business: Business): Observable<Business> {
    return this.http.post<Business>(`${this.url}/businesses/`, business);
  }

  getBusinesses(): Observable<Business[]> {
    return this.http.get<Business[]>(`${this.url}/businesses/`);
  }

  getNeighborhoods(): Observable<Neighborhood[]> {
    return this.http.get<Neighborhood[]>(`${this.url}/neighborhoods`);
  }

  userFeedback(message: string, css: string): void {
    this.flashMessage.show(message, {
      cssClass: css,
      timeout: 3000,
    });
  }
}
