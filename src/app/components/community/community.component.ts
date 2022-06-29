import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { Profile } from 'src/app/models/Profile';
import { CommunityService } from 'src/app/services/community.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css'],
})
export class CommunityComponent implements OnInit {
  posts: Post[] = [];
  profile!: Profile;
  user: any;
  searchResults!: Post[];
  constructor(
    private communityService: CommunityService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getPosts()
    // this.authService.getProfile().subscribe();
    this.authService.getProfile().subscribe((profile) => {
      this.profile = profile;
      this.user = this.profile.user;
      this.user.image = this.profile.image;
    });
  }

  getPosts() {
    this.communityService.getPosts().subscribe((posts) => (this.posts = posts));
  }

  addPost(post: Post): void {
    this.posts.unshift(post);
  }

  onLogout(): void {
    this.authService.logout(this.profile.user).subscribe();
  }

  newSearch(posts: any): void {
    posts.subscribe((newPosts: any) => {
      this.searchResults = newPosts;
      console.log(newPosts);
    });
  }
}
