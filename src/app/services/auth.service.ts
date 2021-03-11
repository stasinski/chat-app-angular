import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';

interface IUserInfo {
  isFetchingUserInfo: boolean;
  isUser: boolean;
  userId: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  isFetchingUserInfo = true;
  isUser = false;
  userId: string | null = null;

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
      console.log(user);
      this.userInfoChange();
    });
  }
  ngOnDestroy() {
    this.unsubscribe();
  }

  userInfoChange() {
    return this.userInfoChangeEmiter.next({
      isFetchingUserInfo: this.isFetchingUserInfo,
      isUser: this.isUser,
      userId: this.userId,
    });
  }
}
