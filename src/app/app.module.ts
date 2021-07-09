import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import * as firebase from 'firebase';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CheckFormFieldValidity } from './services/formvalidity.directive';
import { CommonModule } from '@angular/common';
import { BecomeDonarComponent } from './components/become-donar/become-donar.component';
import { HomeComponent } from './components/home/home.component';
import { DonorsListComponent } from './components/donors-list/donors-list.component';
import { NgxLoadingModule } from 'ngx-loading';
import { OtpVerifyComponent } from './components/otp-verify/otp-verify.component';
import { FAQComponent } from './components/faq/faq.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { DonorViewComponent } from './components/donor-view/donor-view.component';
import { PhoneAuthComponent } from './components/phone-auth/phone-auth.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginSignupComponent,
    NavBarComponent,
    HomeComponent,
    BecomeDonarComponent,
    DonorsListComponent,
    CheckFormFieldValidity,
    OtpVerifyComponent,
    FAQComponent,
    ProfileEditComponent,
    DonorViewComponent,
    PhoneAuthComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({})
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
