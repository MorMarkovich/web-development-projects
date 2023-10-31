import { Injectable } from '@angular/core';
import { UserCredentials } from './user-credentials';
import * as CryptoJS from 'crypto-js';
import { BankTransaction, TransactionType } from './bank-transaction';
import {AccountOwner} from './account-owner';
import { BankAccountDetails } from './bank-account-details';

const USER_CREDENTIALS_KY: string = "USER_CREDENTIALS";
const TARNSACTION_ARRAY_KY: string = "TRANSACTION_ARRAY";
const OWNER_KY: string = "OWNER_DETAILS_KEY";
const BANK_DETAILS_KY = "BANK_DETALIS_KEY";
const SALT: string = "mko)9Ijn8UhErtb";
const SECRET: string = "kjfkldj^&kjdk";
@Injectable({
  providedIn: 'root'
})
export class BankDataService {
  private peula?: BankTransaction;
  private flag: boolean = false;
  private LigalAction: BankTransaction[] = [];
  currentUser?: UserCredentials;
  theUserCredential: UserCredentials | null = null;// = new UserCredentials("siteAdmin@bigbank.com", "1234");
  private menuVisible:Boolean=false;
  detailsOwner: AccountOwner = new AccountOwner("Plonit Almonit","ta",129387465);
  private count:  number = 0;
  private detailsBank: BankAccountDetails = new BankAccountDetails("Rimonim Givataim", 762, 113344);
  constructor() {
    localStorage.removeItem("USER_CREDENTIALS");
    localStorage.removeItem("TRANSACTION_ARRAY");
    localStorage.removeItem("OWNER_DETAILS_KEY");
    localStorage.removeItem("BANK_DETALIS_KEY");
    this.loadFillUser();
    this.loadFillArray();
    this.loadFillOwner();
    this.loadFillBankDetails();
  }
  getMenuVisibility():Boolean
  {
      return this.menuVisible;
  }
  setMenuVisibility(nwStat:Boolean):void
  {
      this.menuVisible=nwStat;
  }
  isArrayTransctionEmpty(): boolean{
    if(this.flag == false&&(this.LigalAction[this.LigalAction.length-1]==undefined || this.LigalAction[this.LigalAction.length-1].trnTyp!=TransactionType.openAcount)){
      return false;
    }
    this.flag=true;
    return true;
  }
  getTransactionArray():BankTransaction[]{
      return this.LigalAction;
  }
  private loadFillUser(): void {
    const value = this.getFromLocalStorage(USER_CREDENTIALS_KY);// the preferd syntax
    //same as const parmanentStr=localStorage[this.parmanentKy];
    if (!value) {//אין אחסון של נתונים בלוקל סטורג
      this.loadInitUserCredentialsData();
    }
    else
      try {//ניסיון לטעון הנתונים מהלוקל סטורג
        this.theUserCredential = value;
      }
      catch (prblm) {//הנתונים בלוקל סטורג לא תקינים
        alert("בעיה במקור הנתונים, טוען נתוני Mock");
        this.loadInitUserCredentialsData();
      }
  }
  private loadFillArray(): void {
    const value = this.getFromLocalStorage(TARNSACTION_ARRAY_KY);// the preferd syntax
    //same as const parmanentStr=localStorage[this.parmanentKy];
    if (!value) {//אין אחסון של נתונים בלוקל סטורג
      this.loadInitUserArrayData();
    }
    else
      try {//ניסיון לטעון הנתונים מהלוקל סטורג  
        this.LigalAction = value;
      }
      catch (prblm) {//הנתונים בלוקל סטורג לא תקינים
        alert("בעיה במקור הנתונים, טוען נתוני Mock");
        this.loadInitUserArrayData();
      }
  }
  private loadFillOwner(): void {
    const value = this.getFromLocalStorage(OWNER_KY);// the preferd syntax
    //same as const parmanentStr=localStorage[this.parmanentKy];
    if (!value) {//אין אחסון של נתונים בלוקל סטורג
      this.loadInitOwnerData();
    }
    else
      try {//ניסיון לטעון הנתונים מהלוקל סטורג  
        this.LigalAction = value;
      }
      catch (prblm) {//הנתונים בלוקל סטורג לא תקינים
        alert("בעיה במקור הנתונים, טוען נתוני Mock");
        this.loadInitOwnerData();
      }
  }
  private loadFillBankDetails(): void {
    const value = this.getFromLocalStorage(BANK_DETAILS_KY);// the preferd syntax
    //same as const parmanentStr=localStorage[this.parmanentKy];
    if (!value) {//אין אחסון של נתונים בלוקל סטורג
      this.loadInitBankDetailsData();
    }
    else
      try {//ניסיון לטעון הנתונים מהלוקל סטורג  
        this.LigalAction = value;
      }
      catch (prblm) {//הנתונים בלוקל סטורג לא תקינים
        alert("בעיה במקור הנתונים, טוען נתוני Mock");
        this.loadInitBankDetailsData();
      }
  }
  isCredentialOk(inVlus: UserCredentials): boolean {
    return (inVlus.eml == this.theUserCredential?.eml && this.encrptPwd(inVlus.pwd) == this.theUserCredential.pwd);
  }
  encrptPwd(pwd: string): string {
    return CryptoJS.SHA3(pwd + SALT, { outputLength: 512 }).toString();
  }

  loadInitUserCredentialsData(): void {
    const t: string = JSON.stringify(new UserCredentials("siteAdmin@bigbank.com", this.encrptPwd("1234")));
    this.theUserCredential = JSON.parse(t);
    this.updateUSerStorage();
  }
  loadInitUserArrayData(): void {
    const x:BankTransaction[] = [];
    const t: string = JSON.stringify(x);
    this.LigalAction = JSON.parse(t);
    this.updateArrayStorage();
  }
  loadInitOwnerData(): void {
    const x:string = JSON.stringify(new AccountOwner(this.detailsOwner.name, this.detailsOwner.address, 129387465));
    this.detailsOwner = JSON.parse(x.toString());
    this.updateOwnerStorage();
  }
  loadInitBankDetailsData():void {
    const x:string = JSON.stringify(new BankAccountDetails("Big Bank Inc",762,113344));
    this.detailsBank = JSON.parse(x);
    this.updateBankDetialsStorage();
  }
  updateUSerStorage(): void {
    this.updateLocalStorage(USER_CREDENTIALS_KY ,this.theUserCredential);
  }
  updateArrayStorage(): void {
   this.updateLocalStorage(TARNSACTION_ARRAY_KY ,this.LigalAction);
  }
  updateOwnerStorage(): void {
    this.updateLocalStorage(OWNER_KY, this.detailsOwner);
  }
  updateBankDetialsStorage(): void {
    this.updateLocalStorage(BANK_DETAILS_KY, this.detailsBank);
  }
  changeOwnerDetials(name:string, address:string):void{
    this.detailsOwner.name = name;
    this.detailsOwner.address = address;
    this.updateOwnerStorage();
  }
  updateLocalStorage(key : string , val : any){
    try {
      const json = JSON.stringify(val);
      const encrypted = this.encrypt(json);
      localStorage.setItem(key, encrypted); // the preferd syntax
      // same as localStorage[this.parmanentKy]=savedStr
    }
    catch (prblm) {
      alert("שמירת הנתונים נכשלה");
    }
  }
  getCurrentBalance():number{
    if(this.LigalAction.length == 0){
      return 0;
    }
    return this.LigalAction[this.LigalAction.length-1].currentBalance;
  }
  getCurrentOwner(){
    return this.detailsOwner;
  }
  getFromLocalStorage(key : string){
    try{
    const encryptedJson = localStorage.getItem(key);
    if(!encryptedJson){
      return;
    }
     const decryptedJson =  this.decrypt(encryptedJson);
     return  JSON.parse(decryptedJson);
    }
    catch(err){
      alert("טעינת הנתונים נכשלה");
    }
  }
  editBankDetails(newName: string, newBranchNumber: number, newAccountNumber: number): void {
    this.detailsBank = new BankAccountDetails(newName, newBranchNumber, newAccountNumber);
    this.updateBankDetialsStorage();
  }
  getBranchName():string {
    return this.detailsBank.branchName;
  }
  getBranchNumber():number {
    return this.detailsBank.branchNumber;
  }
  getBranchAccountNumber():number {
    return this.detailsBank.accountNumber;
  }
  encrypt(val : string){
    return CryptoJS.AES.encrypt(val,SECRET).toString();
  }

  decrypt(val : string){
    return CryptoJS.AES.decrypt(val,SECRET).toString(CryptoJS.enc.Utf8);
  }

  setCurrentUsr(usr: UserCredentials): void {
    this.currentUser = usr;
  }

  userSignedIn(): boolean {
    return this.currentUser != undefined;
  }

  userDisconnect(): void {
    this.currentUser = undefined;
  }

  isPwdOk(typdPwd: string): boolean {
    return (this.theUserCredential?.pwd + "" == this.encrptPwd(typdPwd));
  }

  changePwd(nwPwd: string): void {
    if (this.theUserCredential)
      this.theUserCredential.pwd = this.encrptPwd(nwPwd);
      this.updateUSerStorage();
  }

  updateCount():number{
    this.count++;
    return this.count; 
 }
 /*deleteTransaction(index: number): boolean | void {
  const updateTransaction: BankTransaction[] = [];
  let balance = this.LigalAction[index - 1].currentBalance;
  for (let i = index + 1; i < this.LigalAction.length; i++){
    const transaction = this.LigalAction[i];

    balance += transaction.trnTyp == TransactionType.withdraw ? -transaction.amount : transaction.amount;

    if (balance < -2000) {
      return alert('לא ניתן לבצע את הפעולה בגלל חריגה.');

      updateTransaction.push(
        new BankTransaction(
          transaction.amount,
          transaction.trnDate,
          transaction.asmachta,
          transaction.trnTyp,
          transaction.note,
          transaction.numerator,
          transaction.currentBalance
        )
      );
    }
  }
  this.LigalAction.splice(index);
  this.LigalAction = this.LigalAction.concat(updateTransaction);
  this.updateArrayStorage();
  return true;
 }*/
 deleteTransaction(transaction: BankTransaction)
  {
    const index = this.LigalAction.indexOf(transaction);
    this.LigalAction.splice(index, 1);
    for (let i = index; i < this.LigalAction.length; i++)
    {
      const toUpdate = this.LigalAction[i];
      if(transaction.trnTyp as any === '1')
      {
        toUpdate.amount -= transaction.amount;
      }
      else
      {
        toUpdate.amount += transaction.amount;
      }
    }
    if(transaction.trnTyp as any === '1')
    {
      this.count -= transaction.amount;
    }
    else
    {
      this.count += transaction.amount;
    }
    this.updateArrayStorage();
  }

 getCount():number{
  return this.count;
 }
 getCurrentDate():any {
  return this.peula?.trnDate;
 }
 addArray(amount:number, trnDate:string, asmachta:string,trnTyp:TransactionType, note:string, currentBalance:number):void{
  let newNumerator = 1;

  if(this.LigalAction.length){
    const sortingByNumerator = this.LigalAction.sort((a , b) =>{
      return a.numerator - b.numerator;
    });
    newNumerator = sortingByNumerator[sortingByNumerator.length - 1].numerator + 1;
  }

  this.peula=new BankTransaction(amount,new Date(trnDate),asmachta || `#${newNumerator}`,trnTyp,note,newNumerator,currentBalance);
  this.LigalAction.push(this.peula);
}
}
