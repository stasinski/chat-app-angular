import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoadingPage = true;

  constructor(
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.authService.userInfoChangeEmiter.subscribe(
      ({ isFetchingUserInfo }) => {
        this.isLoadingPage = isFetchingUserInfo;
        this.changeDetectorRef.detectChanges();
      }
    );
  }
}
