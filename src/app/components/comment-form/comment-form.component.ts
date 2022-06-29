import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  @Output() commentText: EventEmitter<string> = new EventEmitter();
  comment: string = '';
  commentError: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  onComment() {
    if (this.comment.length >= 2) {
      this.commentText.emit(this.comment.trim());
      this.comment = '';
      this.commentError = false;
    }
    return this.commentError = true;
  }
}
