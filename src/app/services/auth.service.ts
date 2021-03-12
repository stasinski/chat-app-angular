import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';

interface IUserInfo {
  isFetchingUserInfo: boolean;
  isUser: boolean;
  userId: string | null;
  authError: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  isFetchingUserInfo = true;
  isUser = false;
  userId: string | null = null;
  authError: string | null = null;

  userInfoChangeEmiter = new Subject<IUserInfo>();

  unsubscribe: any;

  constructor(private auth: AngularFireAuth) {
    this.unsubscribe = this.auth.onAuthStateChanged((user) => {
      this.isFetchingUserInfo = false;
      if (user) {
        this.isUser = true;
        this.userId = user.uid;
      } else {
        this.isUser = false;
        this.userId = null;
      }
      this.userInfoChange();
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  login(email: string, password: string) {
    this.isFetchingUserInfo = true;
    this.authError = null;
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        if (user) {
          this.isUser = true;
          this.userId = user.uid;
          this.isFetchingUserInfo = false;
        } else {
          throw new Error('User not Exist');
        }
      })
      .catch((error) => {
        this.authError = 'Error';
      })
      .finally(() => this.userInfoChange());
  }

  register(email: string, password: string) {
    this.isFetchingUserInfo = true;
    this.authError = null;
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data);
        const { user } = data;
        if (user) {
          this.isUser = true;
          this.userId = user.uid;
          this.isFetchingUserInfo = false;
        } else {
          throw new Error('An Error occured');
        }
      })
      .catch((error) => {
        this.authError = 'Error';
        console.log(error);
      })
      .finally(() => this.userInfoChange());
  }

  logout() {
    this.isFetchingUserInfo = true;
    this.auth
      .signOut()
      .then(() => {
        this.isUser = false;
        this.userId = null;
        this.isFetchingUserInfo = false;
      })
      .finally(() => this.userInfoChange());
  }

  userInfoChange() {
    return this.userInfoChangeEmiter.next({
      isFetchingUserInfo: this.isFetchingUserInfo,
      isUser: this.isUser,
      userId: this.userId,
      authError: this.authError,
    });
  }
}
