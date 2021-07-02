import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service.service';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {
  windowRef: any;
  phoneNumber:string;
  verificationCode: string;
  user: User;
  signupForm: FormGroup;
  signinForm: FormGroup;
  constructor( private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");
    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });
    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });
// 
    // https://stackoverflow.com/questions/46878179/how-to-use-firebase-invisible-recaptcha-for-angular-web-app
    // this.windowRef.recaptchaVerifier = this.afAuth.creeat
    // this.afAuth.signInWithPhoneNumber(this.phoneNumber, '')
    // .then(res => {
    //   console.log('Successfully signed up!', res);
    // })
    // .catch(error => {
    //   console.log('Something is wrong:', error.message);
    // });   

  }
  onSignIn(form: FormGroup){
    this.authService.SignIn(form.value.email, form.value.password);
  }
  onSignUp(form: FormGroup){
    this.authService.SignUp(form.value);
  }
}
