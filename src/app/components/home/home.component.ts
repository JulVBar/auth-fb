import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public afAuth: AngularFireAuth)
  { }

  ngOnInit(): void {
    console.log(this.afAuth.user)
  }

  logout(): void {
    this.authService.logoutUser();
  }
}
