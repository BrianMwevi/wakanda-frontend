import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/Profile';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.css'],
})
export class ProfileNavComponent implements OnInit {
  @Input() profile$!: Profile;
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {}
  onLogout(): void {
    this.authService.logout(this.profile$.user).subscribe((resp) => {
      this.route.navigate([this.authService.redirectUrl]);
    });
  }
}
