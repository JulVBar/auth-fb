import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  firebaseErrorMessage: string;
  mailSent: boolean;
  email: string | null;

  constructor(private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth) {
      this.resetForm = new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.email])
    });
    this.firebaseErrorMessage = '';
    this.mailSent = false;
    this.email = '';
    }

  ngOnInit(): void {
  }

  resetPassword() {
    if (this.resetForm.invalid) // if there's an error in the form, don't submit it
        return;

    this.email = this.resetForm.value.email;

    this.authService.resetPassword(this.resetForm.value.email).then((result) => {
      if (result == null) {// null is success, false means there was an error
            console.log('send to email...');
            this.mailSent = true;
        }
        else if (result.isValid == false) {
            console.log('login error', result);
            this.firebaseErrorMessage = result.message;
        }
    });
  }
}
