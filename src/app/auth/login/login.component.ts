import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  errors: { email: boolean; password: boolean };

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private auth: AngularFireAuth
  ) {
    this.errors = {
      email: false,
      password: false,
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    this.errors.email = false;
    this.errors.password = false;
    if (!this.loginForm.get('email')?.valid) {
      this.errors.email = true;
    }
    if (!this.loginForm.get('password')?.valid) {
      this.errors.password = true;
    }
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      if (email && password) {
        this.auth
          .signInWithEmailAndPassword(email, password)
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    this.loginForm.reset();
    this.changeDetectorRef.detectChanges();
  }
}
