import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLoggedIn$: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    
const links = document.querySelectorAll(".nav-links li");

  }
toggle(){
  const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
navLinks.classList.toggle("open");
hamburger.classList.toggle("toggle");
}
logout(){
  this.authService.SignOut();
}
}
