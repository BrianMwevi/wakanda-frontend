import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CommunityService } from 'src/app/services/community.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  showNav: boolean = false;
  showSearch: boolean = false;
  searchResults$!: Observable<Post[]>;
  private searchTerms = new Subject<string>();
  constructor(
    private communityService: CommunityService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.searchResults$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        return this.communityService.searchPosts(term);
      })
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
