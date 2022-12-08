import { Component, Input, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/Profile';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CommunityService } from 'src/app/services/community.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css'],
})
export class ProfileFormComponent implements OnInit {
  @Input() profile!: any;
  image$!: File;
  selectedImage!: File;

  constructor(
    private authService: AuthService,
    private communityService: CommunityService
  ) {}

  ngOnInit(): void {}
  uploadFile(file: any): void {
    const selectedImage = new FileReader();
    selectedImage.onload = () => {
      const imageUrl = selectedImage.result;
      this.profile.image = imageUrl;
    };
    const image = file.target.files[0];
    selectedImage.readAsDataURL(image);
    this.selectedImage = image;
  }

  updateProfile({ value, valid }: NgForm) {
    // User data construct
    const user = {
      first_name: this.profile.user.first_name,
      last_name: this.profile.user.last_name,
      username: this.profile.user.username,
      email: this.profile.user.email,
    };
    this.authService.updateUser(this.profile.id, user).subscribe((user) => {
      user.image = this.profile.image;
      this.profile.user = user;
      this.communityService.userFeedback(
        'Profile updated successfully',
        'alert-success'
      );
    });
    // Profile data construct
    const newProfile = new FormData();
    newProfile.append('bio', value.bio);
    if (this.selectedImage) {
      newProfile.append('image', this.selectedImage, this.selectedImage.name);
    }

    this.authService
      .updateProfile(this.profile.id, newProfile)
      .subscribe((resp) =>
        this.communityService.userFeedback(
          'Profile updated successfully',
          'alert-success'
        )
      );
  }
}
