import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  @ViewChild('signupForm') signupForm: any;
  @ViewChild('loginForm') loginForm: any;
  isReset: boolean = false;
  isLoginForm: boolean = true;
  username: string = '';
  email: string = '';
  password: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {}

  onSignup({ value, valid }: NgForm) {
    if (valid) {
      this.authService.signup(value).subscribe((resp) => {
        this.isLoginForm = true;
        this.flashMessage.show('Account created! Please login.', {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        return this.signupForm.onReset();
      });
    }
    return false;
  }

  onLogin({ value, valid }: NgForm) {
    if (valid) {
      this.authService.login(value).subscribe((resp) => {
        this.authService.getProfile().subscribe((profile) => {
          this.router.navigate([`/community/profile/${profile.id}`]);
          this.flashMessage.show('Logged in Successfully!', {
            cssClass: 'alert-success',
            timeout: 3000,
          });
        });
      });
    }
    return false;
  }

  redirectUrl(url: string) {
    this.router.navigate([url]);
  }
}
