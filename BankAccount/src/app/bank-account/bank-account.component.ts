import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountOwner } from '../account-owner';
import { BankAccountDetails } from '../bank-account-details';
import { BankDataService } from '../bank-data.service';
import { TransactionType, BankTransaction } from '../bank-transaction';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})

export class BankAccountComponent implements OnInit {
  count:number = this.data_svc.getCount();
  currentAmount: number = 0;
  currentBalance: number = this.data_svc.getCurrentBalance();
  transaction?: BankTransaction = undefined;
  accountDetails: BankAccountDetails = new BankAccountDetails(this.data_svc.getBranchName(),this.data_svc.getBranchNumber(),this.data_svc.getBranchAccountNumber());
  currentTransactionType: number = -1;
  currentTransactionAsmachta: string = "";
  currentTransactionDateS: string = "";
  currentTransactionNote: string = "";
  currentOwner: AccountOwner = new AccountOwner("plonit almonit", "ta", 129387465);
  transactionTypeNames: string[] = [];
  lastActionFail: boolean = false
  editAccountOwner: boolean = false;

  constructor(private router_srv: Router, public data_svc: BankDataService) {
    //this.transaction = new BankTransaction(1000, undefined, "opening", TransactionType.openAcount);
    //this.accountDetails = new BankAccountDetails("Rimonim Givataim", 762, 113344);

    for (let optn in TransactionType)
      if (isNaN(Number(optn)))
        this.transactionTypeNames.push(optn);

  }
  doTransaction(): void {
    this.count = this.data_svc.updateCount();
    this.lastActionFail = false;
    if(this.count == 0 && this.currentTransactionType){
      this.currentTransactionType=TransactionType.openAcount;
      this.transactionTypeNames[0]="openAcount";
      alert("הפיכת פעולת ההפקדה ליצירת חשבון");
    }
    if (this.currentAmount == null || this.currentAmount < 0) {
      showErrorFocus("סכום חייב להיות מספר לא שלילי", "amount");
      return;
    }
    if (this.currentTransactionAsmachta.trim().length < 4) {
      showErrorFocus("אסמכתא לפחות 4 תוים", "asmachta");
      return;
    }
    if (this.currentTransactionDateS == "") {
      showErrorFocus("תאריך חובה", "taarich");
      return;
    }
    let achshav: Date = new Date();
    let typedDt: Date = new Date(this.currentTransactionDateS);
    if (typedDt > achshav) {
      showErrorFocus("תאריך מאוחר מהיום אסור", "taarich");
      return;
    }

    const lastTransaction = this.data_svc.getTransactionArray()[this.data_svc.getTransactionArray().length - 1];

    if(lastTransaction){
      if(typedDt < lastTransaction.trnDate){
        showErrorFocus("לא ניתן להכניס תאריך הקטן מתנועות קודמות", "taarich");
        return;
      }
    }

    switch (this.currentTransactionType * 1) {
      case TransactionType.openAcount: this.currentBalance = this.currentAmount;
        break;
      case TransactionType.deposit: this.currentBalance += this.currentAmount;
        break;
      case TransactionType.withdraw: if ((this.currentBalance - this.currentAmount) < this.accountDetails.limit) {
        this.lastActionFail = true;
        return;
      }
        this.currentBalance -= this.currentAmount;
        break;
      default: alert('לא בחרת סוג פעולה');
        return;
    }
    if(this.data_svc.getTransactionArray() != null){  
    }
    //this.transaction = new BankTransaction(this.currentAmount, new Date(this.currentTransactionDateS), this.currentTransactionAsmachta.trim(), this.currentTransactionType);
    this.data_svc.addArray(this.currentAmount, this.currentTransactionDateS, this.currentTransactionAsmachta.trim(), this.currentTransactionType, this.currentTransactionNote.trim(), this.currentBalance)
    this.currentAmount = 0;
    this.currentTransactionType = -1;
    this.currentTransactionAsmachta = "";
    this.currentTransactionDateS = "";
    this.currentTransactionNote = "";
  }
  toString(): string {
    let ezer = `${this.transaction} into ${this.accountDetails}`;
    return ezer;
  }

  ngOnInit(): void {
    this.data_svc.setMenuVisibility(true);
    if (!this.data_svc.userSignedIn())
      this.router_srv.navigateByUrl("/AccountLogin");
  }
}
function showErrorFocus(msg: string, id: string): void {
  alert(msg);
  document.getElementById(id)?.focus();
}