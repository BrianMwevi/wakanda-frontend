import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/Post';

import { Profile } from 'src/app/models/Profile';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, Subject } from 'rxjs';
import { CommunityService } from 'src/app/services/community.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  profile!: Profile;
  @Output() searchResults$: EventEmitter<Observable<Post[]>> =
    new EventEmitter();
  private searchTerms = new Subject<string>();

  constructor(
    private authService: AuthService,
    private communityService: CommunityService,
    private route: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.searchResults$.emit(
      this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => {
          return this.communityService.searchPosts(term);
        })
      )
    );
    this.authService.profile.subscribe((profile) => (this.profile = profile));
  }

  onLogout(): void {
    this.authService
      .logout(this.profile.user)
      .subscribe((resp) =>
        this.flashMessage.show("You've been logged out", {
          cssStyle: 'alert-success',
          timeout: 5000,
        })
      );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
