import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { AuthService } from './auth-service.service';
import { LocalUserService } from './localUser.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private angularFirestore: AngularFirestore,
    private toastr: ToastrService,
    private location : Location,
    private localUserService: LocalUserService ) {}

  getUserDoc(id) {
    return this.angularFirestore
    .collection('users')
    .doc(id)
    .valueChanges()
  }

  getUserList() { 
    return this.angularFirestore
    .collection("users")
    .snapshotChanges();
  }

  createUser(user: User) {
    return new Promise<any>((resolve, reject) =>{
      this.angularFirestore
        .collection("users")
        .add(user)
        .then(response => { console.log(response) }, error => reject(error));
    });
  }

  deleteUser(user) {
    return this.angularFirestore
      .collection("users")
      .doc(user.id)
      .delete();
  }
  
  updateUser( id, user: any) {
console.log(user);
return new Promise<any>((resolve, reject) =>{
  this.angularFirestore
  .collection("users")
  .doc(id)
  .update(user)
    .then(response => { 
       this.toastr.success("Update success.")
       this.localUserService.setUser(user)
       window.location.reload();

    }, error => reject(error));
});
   
  }
}