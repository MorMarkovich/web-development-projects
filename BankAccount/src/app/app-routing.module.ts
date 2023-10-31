import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountLoginComponent } from './account-login/account-login.component';
import { AccountOwnerComponent } from './account-owner/account-owner.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditBankDetailsComponent } from './edit-bank-details/edit-bank-details.component';
import { DisplayTransactionComponent } from './display-transaction/display-transaction.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';

const routes: Routes = [
  { path: 'AccountLogin', component: AccountLoginComponent },
  { path: 'BankAccount', component: BankAccountComponent },
  { path: 'ChangePassword', component: ChangePasswordComponent },
  { path: 'AccountOwner', component: AccountOwnerComponent },
  {path: 'EditBankDetails', component: EditBankDetailsComponent },
  {path: 'DisplayTransaction', component: DisplayTransactionComponent },
  { path: 'StudentDetails', component: StudentDetailsComponent},
  { path: 'TransactionDetails/:counter', component: TransactionDetailsComponent},
  { path: '', redirectTo: '/StudentDetails', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
