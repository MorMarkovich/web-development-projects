import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankDataService } from '../bank-data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router_srv: Router, private data_svc: BankDataService) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.data_svc.userDisconnect();
    this.router_srv.navigateByUrl("/StudentDetails");
  }
  showMenu():Boolean{
    return this.data_svc.getMenuVisibility();
  }
  getAccountOwnerName():string{
    return this.data_svc.getCurrentOwner().name;
  }
  getCurrentBalance():number{
    return this.data_svc.getCurrentBalance();
  }
  getCurrentDate():any {
    return this.data_svc.getCurrentDate();
  }
}
