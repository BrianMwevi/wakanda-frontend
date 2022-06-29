import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './components/auth/auth.component';
import { CommunityComponent } from './components/community/community.component';
import { LandingComponent } from './components/landing/landing.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HasNeighborhoodGuard } from './guards/has-neighborhood.guard';

import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';

const routes: Routes = [
  { path: '', component: LandingComponent, canActivate: [IsLoggedInGuard] },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'community',
    component: CommunityComponent,
    canActivate: [IsAuthenticatedGuard, HasNeighborhoodGuard],
  },
  {
    path: 'community/profile/:id',
    component: ProfileComponent,
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [IsAuthenticatedGuard, IsLoggedInGuard],
})
export class AppRoutingModule {}
