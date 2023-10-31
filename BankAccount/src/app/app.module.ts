import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { StudentDetailsComponent } from './student-details/student-details.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { AccountOwnerComponent } from './account-owner/account-owner.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MenuComponent } from './menu/menu.component';
import { EditBankDetailsComponent } from './edit-bank-details/edit-bank-details.component';
import { DisplayTransactionComponent } from './display-transaction/display-transaction.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';


@NgModule({
  declarations: [
    StudentDetailsComponent,
    AppComponent,
    AccountOwnerComponent,
    BankAccountComponent,
    AccountLoginComponent,
    ChangePasswordComponent,
    PageNotFoundComponent,
    MenuComponent,
    EditBankDetailsComponent,
    DisplayTransactionComponent,
    TransactionDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
