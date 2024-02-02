import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { UserStorageService } from './_services/user-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
    private router: Router
  ){}
  
  title = 'E-Commerce-UI';
  isCustomerLoggedIn: boolean= UserStorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean= UserStorageService.isAdminLoggedIn();

  ngOnInit(): void {
    this.router.events.subscribe(
      event=>{
        this.isCustomerLoggedIn= UserStorageService.isCustomerLoggedIn();
        this.isAdminLoggedIn= UserStorageService.isAdminLoggedIn();
      }
    );
  }

  logout(): void{
    UserStorageService.signOut();
    this.router.navigateByUrl("login");
  }
}
