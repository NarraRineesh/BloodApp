import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service.service';
import { WindowService } from 'src/app/services/window.service';
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {
  windowRef: any;
  phoneNumber:string;
  verificationCode: string;
  user;
  signupForm: FormGroup;s
  signinForm: FormGroup;
  phone:number;
  showsignUpVerify: boolean;
  showLoginVerify: boolean
  constructor( private fb: FormBuilder,
    private userService: UserService,
    public afs: AngularFirestore,
    private authService: AuthService,
    private win: WindowService, 
    private toster:ToastrService) { }

  ngOnInit(): void {
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',{
      'size': 'invisible'
    })

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    });
    this.signinForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    });
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");
    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
      this.showLoginVerify = false
    });
    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
      this.showsignUpVerify = false
    });   
  }
  onSignIn(form: FormGroup){
  if(this.signinForm.valid){
    this.userService.getUserList().subscribe(res => {
      const users = res.map( e => {
        return {
          id: e.payload.doc.id,
          data:e.payload.doc.data()
        } as any;
      })
      console.log(users);
      this.user = users.filter(item => item.data.mobile === `+91${this.signinForm.value.mobile}`);
console.log(this.user);

        if(this.user.length != 0){
          this.showLoginVerify = true
    const appVerifier = this.windowRef.recaptchaVerifier;
    this.authService.signInWithPhoneNumber(appVerifier, `+91${this.signinForm.value.mobile}`);
  
        }else{
          console.log('else called');
          
          this.toster.warning(`No user record found with ${this.signinForm.value.mobile}`)
        }
      
    })
    // this.showLoginVerify = true
    // const appVerifier = this.windowRef.recaptchaVerifier;
    // this.authService.signInWithPhoneNumber(appVerifier, `+91${this.signinForm.value.mobile}`);
  }
  else{
    this.toster.warning('Mobile number badly formatted!')
  }
  }
  onSignUp(form: FormGroup){
    if(this.signupForm.valid){
      this.showsignUpVerify = true
      const appVerifier = this.windowRef.recaptchaVerifier;
      this.authService.signUpWithPhoneNumber(appVerifier,`+91${this.signupForm.value.mobile}`, this.signupForm.value);  
    }
    else{
      this.toster.warning('Check out all fields!')
    }
  }
  verifyLoginCode(){
    this.authService.enterVerificationCode(this.verificationCode);
  }
  verifySignUpCode(){
    this.authService.enterSignUpVerificationCode(this.verificationCode);
  }
}
