import { Component, OnInit } from '@angular/core';
import { WindowService } from '../services/window.service';
import  firebase from 'firebase/app';
import 'firebase/auth'
@Component({
  selector: 'app-phone-signin',
  templateUrl: './phone-signin.component.html',
  styleUrls: ['./phone-signin.component.css']
})
export class PhoneSigninComponent implements OnInit {
  windowRef: any;

  constructor(private win: WindowService) { }
  ngOnInit(): void {
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

    this.windowRef.recaptchaVerifier
                  .render()
                  .then( widgetId => {

                    this.windowRef.recaptchaWidgetId = widgetId
    });
  }

}
