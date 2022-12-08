import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { FlashMessagesModule } from 'flash-messages-angular';

import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { LandingComponent } from './components/landing/landing.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RequestsInterceptor } from './interceptors/requests.interceptor';
import { CommunityComponent } from './components/community/community.component';
import { ProfileNavComponent } from './components/profile-nav/profile-nav.component';
import { PostComponent } from './components/post/post.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileFormComponent } from './components/profile-nav/profile-form/profile-form.component';
import { BusinessFormComponent } from './components/business-form/business-form.component';
import { BusinessCardComponent } from './components/business-card/business-card.component';
import { SearchComponent } from './components/search/search.component';
import { CommunityService } from './services/community.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LandingComponent,
    NavbarComponent,
    CommunityComponent,
    ProfileNavComponent,
    PostComponent,
    CommentFormComponent,
    PostFormComponent,
    CommentCardComponent,
    ProfileCardComponent,
    ProfileComponent,
    ProfileFormComponent,
    BusinessFormComponent,
    BusinessCardComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // Import NgxUiLoaderModule
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    // NgxUiLoaderRouterModule.forRoot({ showForeground: false }),
    FlashMessagesModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    AuthService,
    CommunityService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
