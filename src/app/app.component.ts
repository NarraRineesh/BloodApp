import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { LocalUserService } from './services/localUser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User;
  constructor(private localService: LocalUserService, private router: Router){}
  ngOnInit(){
   this.user = this.localService.getUser()
   if(this.user.uid = null){
     this.router.navigate(['/login'])
   }
   else{
     this.router.navigate(['/home'])
   }
  }
}
