import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { BehaviorSubject, lastValueFrom, map, Observable, of } from 'rxjs';
import { User } from '../models/User';
import { Profile } from '../models/Profile';
// import { ProjectsService } from './projects.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl: string = '';

  private initialUser: any = null;
  private profileSource: BehaviorSubject<Profile> = new BehaviorSubject(
    this.initialUser
  );

  public profile = this.profileSource.asObservable();
  private url = `${environment.BASE_URL}`;

  constructor(private http: HttpClient, private route: Router) {
    this.profileSource.next(this.getLocalStorage('profile'));
  }
  async signup(user: User) {
    const value = this.http.post(`${this.url}/users/`, user);
    return await lastValueFrom(value);
  }

  async login(credentials: any) {
    const value = this.http.post(`${this.url}/login/`, credentials);
    return await lastValueFrom(value).then((resp: any) => {
      this.setLocalStorage('token', resp.token);
      this.setLocalStorage('tokenExp', resp.expiry);
      return resp;
    });
  }

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.url}/profile`).pipe(
      map((profile: any) => {
        this.setLocalStorage('profile', profile);
        this.profileSource.next(profile);
        return profile;
      })
    );
  }

  updateProfile(profileId: number, profile: any): Observable<any> {
    return this.http.put(`${this.url}/profile/${profileId}/`, profile);
  }
  updateUser(userId: number, user: any): Observable<User> {
    return this.http.put<User>(`${this.url}/profile/user/${userId}/`, user);
  }

  logout(user: User) {
    return this.http.post<User>(`${this.url}/logout/`, user).pipe(
      map((resp) => {
        this.removeLocalStorage();
        this.profileSource.next(this.initialUser);
        this.route.navigate([this.redirectUrl]);
        return this.profile.subscribe();
      })
    );
  }

  setLocalStorage(key: string, value: any) {
    if (key === 'profile') value = JSON.stringify(value);
    localStorage.setItem(key, value);
    return this.getLocalStorage(key);
  }
  removeLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExp');
    localStorage.removeItem('profile');
    return this.getLocalStorage('token');
  }
  getLocalStorage(key: string): any {
    const item = localStorage.getItem(key);
    if (key === 'profile' && item != null) return JSON.parse(item);
    return item;
  }
}
