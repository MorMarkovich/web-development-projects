import { Component, OnInit } from '@angular/core';
import { BankDataService } from '../bank-data.service';
import { Router } from '@angular/router';
import { BankTransaction } from '../bank-transaction';

@Component({
  selector: 'app-display-transaction',
  templateUrl: './display-transaction.component.html',
  styleUrls: ['./display-transaction.component.css']
})
export class DisplayTransactionComponent implements OnInit {

  transactions: BankTransaction[] = this.data_svc.getTransactionArray();
  chackBox: boolean = false;

  constructor(private router_srv: Router, private data_svc: BankDataService) { }

  ngOnInit(): void {
    this.data_svc.setMenuVisibility(true);
    if (!this.data_svc.userSignedIn())
      this.router_srv.navigateByUrl("/AccountLogin");
  }

}