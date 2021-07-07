import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
// import  firebase from 'firebase/app';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service.service';
import { LocalUserService } from 'src/app/services/localUser.service';
import { UserService } from 'src/app/services/user.service';
import { WindowService } from 'src/app/services/window.service';
@Component({
  selector: 'app-become-donar',
  templateUrl: './become-donar.component.html',
  styleUrls: ['./become-donar.component.css']
})
export class BecomeDonarComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  windowRef: any;
  user: User;
  closeResult = '';
   AndraPradesh = ["Anantapur","Chittoor","East Godavari","Guntur","Kadapa","Krishna","Kurnool","Prakasam","Nellore","Srikakulam","Visakhapatnam","Vizianagaram","West Godavari"];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private win: WindowService,
    public afAuth: AngularFireAuth,
    private userService: UserService,
    private localUserService: LocalUserService,
    private modalService: NgbModal,
    private toster:ToastrService
  ) { 
    this.user = this.localUserService.getUser();
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      city: ['', [Validators.required]],
      bloodGroup: ['', Validators.required],
      area: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      age: ['', [Validators.required]],
      plasma: [''],
      isDonor: true
    });

    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
      },
      'expired-callback': () => {
      }
    })
  }
  ngAfterViewInit(){
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
      },
      'expired-callback': () => {
      }
    });
  }
  routeToDonors(){
    this.router.navigate(['/donors'])
  }
  get registerFormControl() {
    return this.registerForm.controls;
  }
  onSubmit(content) {
    this.submitted = true;
    // if (this.registerForm.valid) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    // }
    // else{
    //   console.log("else called")
    //   console.log(this.registerForm.value);
    // }
  }
  saveUserData(){
    const appVerifier = this.windowRef.recaptchaVerifier;
    this.authService.signInWithPhoneNumber(appVerifier, "+918838949368").then(
      success => {
       console.log(success);
      }
    );
    // this.userService.updateUser(this.user.uid, this.registerForm.value);
this.modalService.dismissAll()
this.toster.success(`Thanks! to be a donor.`);
// this.router.navigate(['/donors'])
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

