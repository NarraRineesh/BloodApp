import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  closeResult: string;
  constructor(private localService:LocalUserService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
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
    this.modalService.dismissAll();
    this.userService.createReportedUser(this.user)
    this.toster.success('Report request sent to admin success.')
  }
open(content){
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });

}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
}
