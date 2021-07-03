import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-become-donar',
  templateUrl: './become-donar.component.html',
  styleUrls: ['./become-donar.component.css']
})
export class BecomeDonarComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      city: ['', [Validators.required]],
      bloodGroup: ['', Validators.required],
      area: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      age: ['', [Validators.required]],
      plasma: ['']
    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.router.navigate(['otp_verify'], { state: { donorData: this.registerForm.value } });

    }
    else{
      console.log("else called")
      console.log(this.registerForm.value);
    }
  }
}

