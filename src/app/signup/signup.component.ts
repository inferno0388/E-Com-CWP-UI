import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor( 
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) { }

  signupForm!: FormGroup;
  hidePassword: boolean= true;

  ngOnInit(): void {
    this.signupForm= this.formBuilder.group({
      name: [null, [
        Validators.required
      ]],
      email: [null, [
        Validators.required, Validators.email
      ]],
      password: [null, [
        Validators.required
      ]],
      confirmPassword: [null, [
        Validators.required
      ]], 
    });
  }

  togglePasswordVisibility(){
    this.hidePassword= !this.hidePassword;
  }

  onSubmit(): void{
    const password= this.signupForm.get('password')?.value;
    const confirmpassword= this.signupForm.get('confirmPassword')?.value;
    console.log("password: ",password);
    console.log("confirmpassword: ", confirmpassword);

    if(password != confirmpassword){
      this.snackBar.open('password do not match!', 'close', {duration: 3000, panelClass: 'error-snackbar'});
      return;
    }
    this.authService.register(this.signupForm.value).subscribe(
      (response: any)=>{
        if(response){
          this.snackBar.open('Sign Up Successful!', 'close', {duration: 3000, panelClass: 'info-snackbar'});
          this.router.navigateByUrl("/login");
        }
      },
      (error: any)=>{
        if(error){
          this.snackBar.open('Sign Up failed, please try again!', 'close', {duration: 3000, panelClass: 'info-snackbar'});
        }
      }
    );

  }


}
