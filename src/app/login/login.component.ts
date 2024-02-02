import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../_services/auth/auth.service';
import { Router } from '@angular/router';
import { UserStorageService } from '../_services/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) { }

  loginForm!: FormGroup;
  hidePassword: boolean= true;

  ngOnInit(): void {
    this.loginForm= this.formBuilder.group({
      email: [null, [
        Validators.required, Validators.email
      ]],
      password: [null, [
        Validators.required
      ]],
    });
  }

  togglePasswordVisibility(){
    this.hidePassword= !this.hidePassword;
  }

  onSubmit(): void{
    const username= this.loginForm.get('email')!.value;
    const password= this.loginForm.get('password')!.value;

    this.authService.login(username, password).subscribe(
      (response: any)=>{
        this.snackBar.open('login success', 'OK', {duration: 1000, panelClass: 'info-snackbar'});
        if(UserStorageService.isAdminLoggedIn()){
          this.router.navigateByUrl('admin/dashboard');
        }else if(UserStorageService.isCustomerLoggedIn()){
          this.router.navigateByUrl('customer/dashboard');
        }
      },
      (error: any)=>{
        this.snackBar.open('Bad Credentials!!', 'close', {duration: 3000, panelClass: 'error-snackbar'});
      }
    );
  }



}
