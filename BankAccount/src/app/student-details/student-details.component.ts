import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankDataService } from '../bank-data.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  name_tz:string = "203957980 Mor Markovich";
  year:string = "התשפ'ב";
  nameCours:string = "Client Side - 35618";
  nameProfessors:string = "צחי מילר - עמיחי פיגנבוים";


  constructor(private router_srv: Router, private data_svc: BankDataService) {}

  ngOnInit(): void {
    this.data_svc.setMenuVisibility(false);
    if (!this.data_svc.userSignedIn())
      this.router_srv.navigateByUrl("/StudentDetails");
  }

  getToAccountLogin():void {
    this.router_srv.navigateByUrl("/AccountLogin");
  }
}
