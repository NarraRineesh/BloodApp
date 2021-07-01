import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalUserService {

  tokenKey = 'user';
  constructor() { }

  setUser(user: unknown) {
    window.localStorage.setItem(this.tokenKey, JSON.stringify(user));
  }
  sessionSetUser(user: User) {
    window.sessionStorage.setItem(this.tokenKey, JSON.stringify(user));
  }
  //this function not called. check why
  getUser(): User {
    const user = window.localStorage.getItem(this.tokenKey);
    return JSON.parse(user);
  }
  //delete complete localstorage when user logs out
  destroyUser() {
    window.localStorage.removeItem(this.tokenKey)
    window.sessionStorage.removeItem(this.tokenKey)
  }

}
