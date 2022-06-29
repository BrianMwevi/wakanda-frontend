import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/Profile';
import { Business } from 'src/app/models/Business';
import { AuthService } from 'src/app/services/auth.service';
import { CommunityService } from 'src/app/services/community.service';
import { Neighborhood } from 'src/app/models/Neighborhood';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile!: Profile;
  selected: string = 'Neighborhoods';
  business!: Business;
  businesses!: Business[];
  neighborhoods!: Neighborhood[];

  constructor(
    private authService: AuthService,
    private communityService: CommunityService
  ) {}

  ngOnInit(): void {
    this.getProfile();
    this.getNeighborhoods();
    this.getBusinesses();
  }

  getProfile(): void {
    this.authService.getProfile().subscribe((profile) => {
      this.profile = profile;
      this.profile.user.image = this.profile.image;
    });
  }

  selectedList(event: any): void {
    this.selected = event.target.innerText;
  }
  onLogout(): void {
    this.communityService.userFeedback(
      "You've been logged out successfully",
      'alert-success'
    );
    this.authService.logout(this.profile.user).subscribe();
  }

  getNeighborhoods(): void {
    this.communityService
      .getNeighborhoods()
      .subscribe((neighborhoods) => (this.neighborhoods = neighborhoods));
  }

  onJoin(neighborhoodId: number): void {
    const neighborhood = { neighborhood: neighborhoodId };
    this.authService
      .updateProfile(this.profile.id, neighborhood)
      .subscribe((resp) => {
        this.authService
          .getProfile()
          .subscribe((resp) => (this.profile.neighborhood = resp.neighborhood));
      });
  }

  newBusiness(business: Business): void {
    this.communityService.userFeedback(
      `${business.name} created successfully`,
      'alert-success'
    );
    this.businesses.unshift(business);
  }

  getBusinesses(): void {
    this.communityService.getBusinesses().subscribe((businesses) => {
      console.log(businesses);
      this.businesses = businesses;
    });
  }
}
