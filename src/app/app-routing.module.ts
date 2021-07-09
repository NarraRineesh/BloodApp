import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BecomeDonarComponent } from './components/become-donar/become-donar.component';
import { DonorViewComponent } from './components/donor-view/donor-view.component';
import { DonorsListComponent } from './components/donors-list/donors-list.component';
import { FAQComponent } from './components/faq/faq.component';
import { HomeComponent } from './components/home/home.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { OtpVerifyComponent } from './components/otp-verify/otp-verify.component';
import { PhoneAuthComponent } from './components/phone-auth/phone-auth.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full',  },
  { path: 'login', component: LoginSignupComponent },
  {path: 'otp_verify',component: OtpVerifyComponent},
  {path: '', component: NavBarComponent, canActivate: [AuthGuard],
children: [
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard] },
  { path: 'profile-edit/:id', component: ProfileEditComponent , canActivate: [AuthGuard] },
  { path: 'donors', component: DonorsListComponent , canActivate: [AuthGuard] },
  { path: 'single-donor/:id', component: DonorViewComponent , canActivate: [AuthGuard] },
  { path: 'become-donor', component: BecomeDonarComponent , canActivate: [AuthGuard] },
  { path: 'FAQ', component: FAQComponent , canActivate: [AuthGuard] },
  { path: 'phone', component: PhoneAuthComponent , canActivate: [AuthGuard] },
]
}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
