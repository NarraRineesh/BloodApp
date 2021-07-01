import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BecomeDonarComponent } from './components/become-donar/become-donar.component';
import { DonorsListComponent } from './components/donors-list/donors-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginSignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'donor-list', component: DonorsListComponent },
  { path: 'become-donor', component: BecomeDonarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
