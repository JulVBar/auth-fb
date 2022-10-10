import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
    selector: 'app-verify-email',
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

    email: string | null;
    mailSent: boolean;
    isLoading: boolean;
    firebaseErrorMessage: string;

    constructor(private authService: AuthService, private router: Router, public afAuth: AngularFireAuth) {
        this.email = '';
        this.mailSent = false;
        this.isLoading = false;
        this.firebaseErrorMessage = '';
    }

    ngOnInit(): void {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.email = user.email;
            }
        });
    }

    resendVerificationEmail() {
        this.isLoading = true;

        this.authService.resendVerificationEmail().then((result) => {
            this.isLoading = false;
            if (result == null) {
                console.log('verification email resent...');
                this.mailSent = true;
            }
            else if (result.isValid == false) {
                console.log('verification error', result);
                this.firebaseErrorMessage = result.message;
            }
        });
    }
}

