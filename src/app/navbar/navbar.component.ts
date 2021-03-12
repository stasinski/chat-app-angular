import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isUserLogged: boolean = false;

  constructor(
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isUserLogged = this.authService.isUser;
    this.authService.userInfoChangeEmiter.subscribe((data) => {
      this.isUserLogged = data.isUser;
      this.changeDetectorRef.detectChanges();
    });
  }
}
