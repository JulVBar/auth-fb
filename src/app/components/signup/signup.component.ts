import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isLoading: boolean;
  signupForm: FormGroup;
  firebaseErrorMessage: string;

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
      this.isLoading = false;
      this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
      if (this.authService.userLoggedIn) {
          this.router.navigate(['/dashboard']);
      }

      this.signupForm = new FormGroup({
          'displayName': new FormControl('', Validators.required),
          'email': new FormControl('', [Validators.required, Validators.email]),
          'password': new FormControl('', Validators.required)
      });
  }

  signup() {
      if (this.signupForm.invalid)
          return;

      this.isLoading = true;
      this.authService.signupUser(this.signupForm.value).then((result) => {
          if (result.isValid == false) this.firebaseErrorMessage = result.message;
          this.isLoading = false;
      }).catch(() => {
          this.isLoading = false;
      });
  }
}
