import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private auth: AngularFireAuth) {}

  ngOnInit() {
    // this.auth
    //   .signInWithEmailAndPassword('test@test.pl', '123456')
    //   .then((user) => {
    //     console.log(user);
    //   })
    //   .catch((err) => console.log(err));
  }
}
