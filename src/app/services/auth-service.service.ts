import { Location } from '@angular/common';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { LocalUserService } from './localUser.service';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData; 
  userState: any;
  confirmationResult: firebase.auth.ConfirmationResult;
  user: User;
  constructor(
    private cookieService: CookieService,
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    private location: Location,
    private toastr: ToastrService, 
     private localUserService: LocalUserService, 
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {    
   
  }

  // Sign in with email/password
  SignIn(email, password) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((user)=>{
        console.log(user)
        this.afs.collection("users").ref.where("email", "==", user.user.email).onSnapshot(snap =>{
          snap.forEach(userRef => {
             this.userData = userRef.data()
            console.log("userRef", userRef.data());
            this.localUserService.setUser(this.userData);
            this.cookieService.set('token', this.userData.uid)
              this.ngZone.run(() => this.router.navigate(["/home"]));
          })
        })
       
      }).catch(err =>{
console.log(err.message)
this.toastr.warning(err.message)
      } )
  }

  // Sign up with email/password
  SignUp(user: User) {
    console.log("sign up called");
    
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        this.toastr.success(`signup success.`)
       this.SetUserData(result.user, user)
      }).catch((error) => {
        console.log(error.message);
        this.toastr.warning(error.message)
      })
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      this.toastr.success('Password reset email sent, check your inbox.');
    }).catch((error) => {
      this.toastr.warning(error)
    })
  }
  SendVerificationMail() {
    return this.afAuth.currentUser.then(u => u.sendEmailVerification())
    .then(() => {
      this.router.navigate(['email-verification']);
    })
}
signInWithPhoneNumber(recaptchaVerifier, phoneNumber, user) {
  console.log(phoneNumber);
  
  return new Promise<any>((resolve, reject) => {
    this.afAuth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        this.user =user
        this.confirmationResult = confirmationResult;
        resolve(confirmationResult);
      }).catch((error) => {
        console.log(error);
        reject('SMS not sent');
      });
  });
}
public async enterVerificationCode(code) {
  return new Promise<any>((resolve, reject) => {
    this.confirmationResult.confirm(code).then(async (result) => {
      console.log(result);
      const user = result.user;
      this.SetUserData(result.user, this.user);
      resolve(user);
    }).catch((error) => {
      reject(error.message);
    });

  });
}
get isLoggedIn(): boolean {  
  const user = JSON.parse(localStorage.getItem('user'));
  return (user !== null) ? true : false;
}

SetUserData(result, user) {
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${result.uid}`);
  console.log(userRef)
  const userState: any = {
    uid: result.uid,
    email: user.email,
    displayName: user.name,
    emailVerified: result.emailVerified,
    isDonor: false,
    photoURL: 'data:image/png;base64,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',
  }
  return userRef.set(userState, {
    merge: true
  })
}
  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.isLoggedIn;
      this.router.navigate(['login']);
      window.location.reload();
    })
  }
}