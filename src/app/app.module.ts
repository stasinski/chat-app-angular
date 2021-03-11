import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { AuthService } from './services/auth.service';

const firebaseConfig = {
  apiKey: 'AIzaSyDUvGO1G_uypQDOI1loImNclLM5Tl9Qy-Y',
  authDomain: 'chat-47a03.firebaseapp.com',
  projectId: 'chat-47a03',
  storageBucket: 'chat-47a03.appspot.com',
  messagingSenderId: '102398731173',
  appId: '1:102398731173:web:b064c84e763ba114913e4c',
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AuthModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
