import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountOwner } from 'src/app/account-owner';
import { BankDataService } from '../bank-data.service';


@Component({
  selector: 'app-account-owner',
  templateUrl: './account-owner.component.html',
  styleUrls: ['./account-owner.component.css']
})
export class AccountOwnerComponent implements OnInit {
  @Input() owner:AccountOwner=new AccountOwner();
  @Input() edit?:boolean;
  name:string = "";
  address:string = "";
  tz:number = 0;
  hasPicture:boolean = false;

  constructor(private data_svc: BankDataService, private router_srv:Router) {
    this.owner = data_svc.detailsOwner;
    const {name, address, tz, hasPicture} = this.owner;
    this.name = name;
    this.address = address;
    this.tz = tz;
    this.hasPicture = hasPicture;
   }

   saveDetailsOwner(): void {
    this.owner.name = this.name.trim();
    this.owner.address = this.address.trim();
    this.owner.tz = this.tz;
    this.owner.hasPicture = this.hasPicture;
    this.data_svc.changeOwnerDetials(this.name, this.address);
   }

  ngOnInit(): void {
    this.data_svc.setMenuVisibility(true);
    if (!this.data_svc.userSignedIn())
      this.router_srv.navigateByUrl("/AccountLogin");
  }
}
