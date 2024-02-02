import { Injectable } from '@angular/core';

const TOKEN= 'ecom-token';
const USER= 'ecom-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }
  static ADMIN_ROLE: string = 'ADMIN';
  static CUSTOMER_ROLE: string = 'CUSTOMER';

  public saveToken(token: string): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public saveUser(user: any): void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  public static getToken(): string{
    return localStorage.getItem(TOKEN)!;
  }

  public static getUser(): any{
    return JSON.parse(localStorage.getItem(USER)!);
  }

  public static getUserId(): string{
    const user= this.getUser();
    if(user == null){
      return '';
    }
    return user.userId;
  }

  public static getUserRole(): string{
    const user= this.getUser();
    if(user == null){
      return '';
    }
    return user.role;
  }

  public static isAdminLoggedIn(): boolean{
    if(this.getToken() == null){
      return false;
    }
    const role: string= this.getUserRole();
    return role == this.ADMIN_ROLE;
  }

  public static isCustomerLoggedIn(): boolean{
    if(this.getToken() == null){
      return false;
    }
    const role: string= this.getUserRole();
    return role == this.CUSTOMER_ROLE;
  }

  public static signOut(): void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }

}
