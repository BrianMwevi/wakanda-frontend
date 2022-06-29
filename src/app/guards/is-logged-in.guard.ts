import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Profile } from '../models/Profile';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedInGuard implements CanActivate {
  profile!: Profile;
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const url = state.url;

    return this.checkIsLoggedIn(url);
  }
  checkIsLoggedIn(url: string): true | UrlTree {
    this.authService.profile.subscribe(
      (profile: Profile) => (this.profile = profile)
    );
    if (this.profile == null) return true;

    // TODO: Create a service to redirect users
    this.authService.redirectUrl = url;
    return this.router.parseUrl('/community');
  }
}
