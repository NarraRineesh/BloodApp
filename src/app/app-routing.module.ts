import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BecomeDonarComponent } from './components/become-donar/become-donar.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DonorsListComponent } from './components/donors-list/donors-list.component';
import { FAQComponent } from './components/faq/faq.component';
import { HomeComponent } from './components/home/home.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { OtpVerifyComponent } from './components/otp-verify/otp-verify.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full',  },
  { path: 'login', component: LoginSignupComponent },
  {path: 'otp_verify',component: OtpVerifyComponent},
  {path: '', component: NavBarComponent, canActivate: [AuthGuard],
children: [
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard] },
  { path: 'donors', component: DonorsListComponent , canActivate: [AuthGuard] },
  { path: 'become-donor', component: BecomeDonarComponent , canActivate: [AuthGuard] },
  { path: 'contact-us', component: ContactUsComponent , canActivate: [AuthGuard] },
  { path: 'FAQ', component: FAQComponent , canActivate: [AuthGuard] },
]
}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
