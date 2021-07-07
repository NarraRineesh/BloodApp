import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { LocalUserService } from 'src/app/services/localUser.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  windowRef: any;
  user: User;
  closeResult = '';
   AndraPradesh = ["Anantapur","Chittoor","East Godavari","Guntur","Kadapa","Krishna","Kurnool","Prakasam","Nellore","Srikakulam","Visakhapatnam","Vizianagaram","West Godavari"];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private localUserService: LocalUserService,
    private modalService: NgbModal,
    private toster:ToastrService
  ) { 
    this.user = this.localUserService.getUser();
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      mobile: [this.user.mobile, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: [this.user.email, [Validators.required]],
      city: [this.user.city, [Validators.required]],
      bloodGroup: [this.user.bloodGroup, Validators.required],
      area: [this.user.area, [Validators.required]],
      weight: [this.user.weight, [Validators.required]],
      age: [this.user.age, [Validators.required]],
      plasma: [''],
      isDonor: true
    });
  }
  get registerFormControl() {
    return this.registerForm.controls;
  }
  onSubmit(){
    if(this.registerForm.valid){
      this.userService.updateUser(this.user.uid, this.registerForm.value);
    }
    else{
      console.log("not valid");
      
    }
  }
 

}
