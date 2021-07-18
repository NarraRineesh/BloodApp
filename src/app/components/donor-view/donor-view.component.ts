import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { LocalUserService } from 'src/app/services/localUser.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-donor-view',
  templateUrl: './donor-view.component.html',
  styleUrls: ['./donor-view.component.css']
})
export class DonorViewComponent implements OnInit {

  user:User
  DonorId: any;
  constructor(private localService:LocalUserService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toster: ToastrService) {
      this.DonorId = this.route.snapshot.params.id;
      
  }

  ngOnInit(): void {
  this.userService.getUserDoc(this.DonorId).subscribe(res => {
    this.user = res as any 
  }); 
    var card = document.querySelector('.js-profile-card');
    var closeBtn = document.querySelectorAll('.js-message-close');
    closeBtn.forEach(function(element, index) {
      console.log(element);
      element.addEventListener('click', function(e) {
        e.preventDefault();
        card.classList.remove('active');
      });
    });
  }
  editProfile(uid: string){
this.router.navigate([`profile-edit/${uid}`])
  }
  reportProfile(){
    this.toster.success('Report request sent to admin success.')
  }

}
