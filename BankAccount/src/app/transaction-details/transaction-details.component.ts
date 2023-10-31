import { Component, OnInit } from '@angular/core';
import { BankDataService } from '../bank-data.service';
import { ActivatedRoute} from '@angular/router';
import { BankTransaction, TransactionType } from '../bank-transaction';
import { Router } from '@angular/router';
import { AccountOwner } from '../account-owner';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {
  TransactionType = TransactionType;
  transaction!: BankTransaction;
  nomerator!: number;
  index!: number;
  currentOwner: AccountOwner = new AccountOwner("plonit almonit","ta",129387465);
  isSuccess:boolean = false;

  constructor(private router_srv: Router, private data_svc: BankDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.data_svc.setMenuVisibility(true);
    if (!this.data_svc.userSignedIn())
      this.router_srv.navigateByUrl("/AccountLogin");

    const mone = Number(this.route.snapshot.paramMap.get("counter"));
    const validTransaction = this.data_svc.getTransactionArray();
    const index = validTransaction.findIndex(transaction => transaction.numerator === mone);
    const nomerator = index + 1;

    if(nomerator > 0){
      const transaction = validTransaction[index];
      this.index = index;
      this.nomerator = nomerator;
      this.transaction = transaction;
    }
    else {
      this.router_srv.navigateByUrl('DisplayTransaction');
    }
  }

  deleteTransaction(): void {
    if(!confirm(`האם למחוק את ההודעה הזו ? (${this.nomerator})`))
    return;
    if(this.transaction.trnTyp == TransactionType.openAcount){
      return alert("לא ניתן למחוק פעולה של פתיחת חשבון");
    }
    this.data_svc.deleteTransaction(this.transaction);
    if(this.isSuccess){
      this.returnTransactionDetials();
    }
  }
  returnTransactionDetials(): void {
    this.router_srv.navigate(['/DisplayTransaction/']);
  }
}
