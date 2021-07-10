import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { WindowService } from 'src/app/services/window.service';

export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;

  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.prefix + this.line
    return `+${num}`
  }

}
@Component({
  selector: 'app-phone-auth',
  templateUrl: './phone-auth.component.html',
  styleUrls: ['./phone-auth.component.css']
})
export class PhoneAuthComponent implements OnInit {
  windowRef: any;
  phone:any;

  phoneNumber = new PhoneNumber()

  verificationCode: string;

  user: any;

  constructor(private win: WindowService,
     private toster:ToastrService) { }

  ngOnInit() {
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

    this.windowRef.recaptchaVerifier
                  .render()
                  .then( widgetId => {

                    this.windowRef.recaptchaWidgetId = widgetId
    });
  }


  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.phoneNumber.e164;

    // firebase.auth()
    //         .signInWithPhoneNumber(this.phone, appVerifier)
    //         .then(result => {

    //             this.windowRef.confirmationResult = result;

    //         })
    //         .catch( error => 
    //           this.toster.warning(error)
    //            );

  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {

                    this.user = result.user;
                    console.log(result);

    })
    .catch( error => console.log(error, "Incorrect code entered?"));
  }


}
