import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserStorageService } from '../user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private userStorageService: UserStorageService
  ) { }
  BASIC_URL: string= `http://localhost:8081`;

   register(signupRequest: any): Observable<any>{ 
    return this.httpClient.post<any>(`${this.BASIC_URL}/sign-up`, signupRequest);
   }

  login(username: string, password: string): Observable<boolean> {
    const httpHeaders= new HttpHeaders().set('content-type', 'application/json');
    const body= {
      username, password
    };
    return this.httpClient.post<any>(`${this.BASIC_URL}/authenticate`, body , {
      headers: httpHeaders,
      observe: 'response'
    }).pipe(
      map(
        (res)=>{
          const token= res.headers.get('authorization')?.substring(7);
          const user= res.body;
          if(token && user){
            this.userStorageService.saveToken(token);
            this.userStorageService.saveUser(user);
            return true;
          }
          return false;
        }
      )
    );
  }
}
