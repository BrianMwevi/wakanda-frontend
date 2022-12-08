import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommunityService } from 'src/app/services/community.service';
import { Post } from 'src/app/models/Post';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit {
  post: string = '';
  selectedImage!: File | any;
  @Output() newPost: EventEmitter<Post> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private communityService: CommunityService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  uploadFile(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  addPost(): void {
    const fd = new FormData();
    if (this.post.length > 10) {
      if (this.selectedImage) {
        fd.append('image', this.selectedImage, this.selectedImage.name);
      }

      fd.append('post', this.post);
      this.authService.profile.subscribe((profile) =>
        fd.append('neighborhood', profile.neighborhood)
      );
      
      this.communityService.createPost(fd).subscribe((post) => {
        (this.post = ''), (this.selectedImage = undefined);
        this.newPost.emit(post);
        this.communityService.userFeedback(
          'Post created successfully',
          'alert-success'
        );
        this.authService.getProfile().subscribe();
        this.route.navigate(['/community']);
      });
    }
  }
}
