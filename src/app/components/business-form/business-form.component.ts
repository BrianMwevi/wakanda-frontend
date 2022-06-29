import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Profile } from 'src/app/models/Profile';
import { Business } from 'src/app/models/Business';
import { CommunityService } from 'src/app/services/community.service';

@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.css'],
})
export class BusinessFormComponent implements OnInit {
  @Input() profile!: Profile;
  name: string = '';
  email: string = '';
  @Output() newBusiness: EventEmitter<Business> = new EventEmitter();
  constructor(private communityService: CommunityService) {}

  ngOnInit(): void {}

  onCreate({ value, valid }: NgForm): void {
    if (valid) {
      value.neighborhood = this.profile.neighborhood;
      this.communityService.createBusiness(value).subscribe((business) => {
        this.name = '';
        this.email = '';
        this.newBusiness.emit(business);
      });
    }
  }
}
