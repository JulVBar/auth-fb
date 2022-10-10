import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: Observable<any>;// Example: store the user's info here (Cloud Firestore: collection is 'users', docId is the user's email, lower case)

  constructor(
    private authService: AuthService,
    public afAuth: AngularFireAuth,
    private firestore: AngularFirestore)
    {}
    // { this.user = null }

    ngOnInit(): void {
      this.afAuth.authState.subscribe(user => {
        console.log('Dashboard: user', user);

        if (user) {
          let emailLower = user.email?.toLowerCase();
          // to fb database user document, which we created
          this.user = this.firestore.collection('users').doc(emailLower).valueChanges();
        }
      });
    }

  logout() {
    this.authService.logoutUser();
  }
}
