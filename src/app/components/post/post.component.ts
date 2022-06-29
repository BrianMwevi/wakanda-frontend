import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/Post';
import { Profile } from 'src/app/models/Profile';
import { CommunityService } from 'src/app/services/community.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  @Input() user: any;

  constructor(
    private communityService: CommunityService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  addComment(newComment: string): void {
    const comment = {
      post: this.post.id,
      comment: newComment,
    };
    this.communityService.addComment(comment).subscribe((createdComment) => {
      this.post.comments.unshift(createdComment);
      this.communityService.userFeedback(
        'Comment added successfuly',
        'alert-success'
      );
      this.authService.getProfile().subscribe();
    });
  }
}
