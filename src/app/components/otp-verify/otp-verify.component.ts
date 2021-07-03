import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.css']
})
export class OtpVerifyComponent implements OnInit {

  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) { 
    console.log("donor data", this.router.getCurrentNavigation().extras.state.donorData);
  }

  ngOnInit(): void {
  }
  sendCodeAgain(){
  this.toastr.success('OTP resend success.')
  }
  
}
