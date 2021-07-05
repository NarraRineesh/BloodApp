import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-donors-list',
  templateUrl: './donors-list.component.html',
  styleUrls: ['./donors-list.component.css']
})
export class DonorsListComponent implements OnInit {
  Donors;
  public loading = false;
  showNoData: boolean;
  closeResult: any;
  AndraPradesh = ["Anantapur","Chittoor","East Godavari","Guntur","Kadapa","Krishna","Kurnool","Prakasam","Nellore","Srikakulam","Visakhapatnam","Vizianagaram","West Godavari"];
  selectedDistrict: string = 'All';
  selectedBloodGroup: string = 'All';
  filterDonors: any[] =[];
  constructor(private userService: UserService, private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getDonors();
  }
  getDonors(){
    this.loading = true;
    this.userService.getUserList().subscribe(res => {
      this.loading = false;
      const donors = res.map( e => {
        return {
          id: e.payload.doc.id,
          data:e.payload.doc.data()
        } as any;
      })
      console.log(this.Donors)
this.Donors = donors.filter(item => item.data.isDonor === true);
this.filterDonors = this.Donors
    }); 
  }
  open(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
  }
  onSelectDistrictType($event){
  this.selectedDistrict = $event

  }
  onSelectBloodGroupType($event){
    
  this.selectedBloodGroup = $event
  }
  filterList(){
// if(this.selectedDistrict === 'All'){
//   console.log(this.Donors, this.selectedBloodGroup);
// this.filterDonors = this.Donors
// }else{
 this.filterDonors= this.Donors.filter((item)=>( item.data.bloodGroup === this.selectedBloodGroup && this.selectedDistrict));
//   console.log(this.filterDonors);
// }
this.modalService.dismissAll();
  }
  reset(){
    this.filterDonors= this.Donors;
    this.modalService.dismissAll();
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
