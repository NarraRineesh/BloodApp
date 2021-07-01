import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LocalUserService } from './localUser.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData; 
  userState: any;
  constructor(
private userService: UserService,
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
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
            if(this.userData.role === "subscriber") {
              this.ngZone.run(() => this.router.navigate(["/subscriber"]));
            }
            if(this.userData.role === "editor") {
              this.ngZone.run(() => this.router.navigate(["/editor"]));
            }
            if(this.userData.role === "admin") {
              this.ngZone.run(() => this.router.navigate(["/admin"]));
            }
          })
        })
       
      }).catch(err =>{
console.log(err.message)
this.toastr.warning(err.message)
      } )
  }

  // Sign up with email/password
  SignUp(user: User) {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
       console.log(result)
       this.SetUserData(result.user, user)
      }).catch((error) => {
        console.log(error.message)
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
get isLoggedIn(): boolean {
  const user = JSON.parse(localStorage.getItem('user'));
  return (user !== null) ? true : false;
}

SetUserData(result, user) {
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  console.log(userRef)
  const userState: any = {
    uid: result.uid,
    email: result.email,
    displayName: user.name,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    mobilenumber: user.mobileNumber,
    department: user.department,
    about: user.about,
    role: user.role
  }
  return userRef.set(userState, {
    merge: true
  })
}
  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }
}