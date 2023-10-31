import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankDataService } from '../bank-data.service';


@Component({
  selector: 'app-edit-bank-details',
  templateUrl: './edit-bank-details.component.html',
  styleUrls: ['./edit-bank-details.component.css']
})
export class EditBankDetailsComponent implements OnInit {

  newBankName = '';
  newBranchNumber: number = 0;
  newAccountNumber: number = 0;

  constructor(private router_srv: Router, private data_svc: BankDataService) { }

  ngOnInit(): void {
    this.data_svc.setMenuVisibility(true);
    if (!this.data_svc.userSignedIn())
      this.router_srv.navigateByUrl("/AccountLogin");
  }

  updateBankDetails(): void {
    if (this.newBankName != "" && this.newBranchNumber != 0 && this.newAccountNumber != 0) {
      this.data_svc.editBankDetails(this.newBankName, this.newBranchNumber, this.newAccountNumber);
      alert('Bank details updated successfully!');
    } else {
      alert('Please provide all the required details.');
    }
  }
  toString(): string {
     return `Big Bank Inc Branch: (${this.data_svc.getBranchName()}) ${this.data_svc.getBranchNumber()} Account#: ${this.data_svc.getBranchAccountNumber()}`; 
  }
}
