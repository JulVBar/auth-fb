import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  loginForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth)
    {
      this.loginForm = new FormGroup({
          'email': new FormControl('', [Validators.required, Validators.email]),
          'password': new FormControl('', Validators.required)
      });
      this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
      if (this.authService.userLoggedIn) {  // if the user's logged in, navigate them to the dashboard (NOTE: don't use afAuth.currentUser -- it's never null)
          this.router.navigate(['/dashboard']);
      }
  }

  loginUser() {
    this.isLoading = true;

    if (this.loginForm.invalid) // if there's an error in the form, don't submit it
        return;

    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
      this.isLoading = false;
      if (result == null) {// null is success, false means there was an error
            console.log('logging in...');
        }
        else if (result.isValid == false) {
            console.log('login error', result);
            this.firebaseErrorMessage = result.message;
        }
    });
  }

  googleSignIn() {
    this.authService.googleSignIn();
  }
}

