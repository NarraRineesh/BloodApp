import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-donors-list',
  templateUrl: './donors-list.component.html',
  styleUrls: ['./donors-list.component.css']
})
export class DonorsListComponent implements OnInit {
  Donors: any[] =[];
  public loading = false;
  showNoData: boolean;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getDonors();
  }
  getDonors(){
    this.loading = true;
    this.userService.getUserList().subscribe(res => {
      this.loading = false;
      this.Donors = res.map( e => {
        return {
          id: e.payload.doc.id,
          data:e.payload.doc.data()
        } as any;
      })
      console.log(this.Donors)
if(this.Donors.length === 0){
  this.showNoData= true
} 
else{
  this.showNoData = false
}   
    }); 
  }

}
