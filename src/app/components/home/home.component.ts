import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LocalUserService } from 'src/app/services/localUser.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
user:User
  constructor(private localService:LocalUserService) {
  this.user =  this.localService.getUser();
  console.log(this.user);
  }

  ngOnInit(): void {
    var messageBox = document.querySelector('.js-message');
    var btn = document.querySelector('.js-message-btn');
    var card = document.querySelector('.js-profile-card');
    var closeBtn = document.querySelectorAll('.js-message-close');

    btn.addEventListener('click', function(e) {
      e.preventDefault();
      card.classList.add('active');
    });

    closeBtn.forEach(function(element, index) {
      console.log(element);
      element.addEventListener('click', function(e) {
        e.preventDefault();
        card.classList.remove('active');
      });
    });
  }

}
