import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Profile } from 'src/app/models/Profile';

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
    private flashMessage: FlashMessagesService,
    private ngxLoader: NgxUiLoaderService
  ) {}

  ngOnInit(): void {}

  onSignup({ value, valid }: NgForm) {
    if (valid) {
      this.ngxLoader.start();
      this.authService
        .signup(value)
        .then((resp) => {
          this.isLoginForm = true;
          this.ngxLoader.stop();
          this.flashMessage.show('Account created! Please login.', {
            cssClass: 'alert-success',
            timeout: 3000,
          });
          return this.signupForm.onReset();
        })
        .catch((errors) => {
          this.ngxLoader.stop();
          for (let errorKey in errors.error) {
            this.flashMessage.show(`${errors.error[errorKey]}`, {
              cssClass: 'alert-danger',
              timeout: 5000,
            });
          }
        });
    }
    return false;
  }

  onLogin({ value, valid }: NgForm) {
    if (valid) {
      this.ngxLoader.start();
      this.authService
        .login(value)
        .then((resp: any) => {
          this.authService.getProfile().subscribe((profile) => {
            this.router.navigate([`/community/profile/${profile.id}`]);
            this.ngxLoader.stop();
            this.flashMessage.show('Logged in Successfully!', {
              cssClass: 'alert-success',
              timeout: 3000,
            });
          });
        })
        .catch((errors) => {
          this.ngxLoader.stop();
          this.flashMessage.show('Wrong username or password', {
            cssClass: 'alert-danger',
            timeout: 5000,
          });
        });
    }
    return false;
  }

  redirectUrl(url: string) {
    this.router.navigate([url]);
  }
}
