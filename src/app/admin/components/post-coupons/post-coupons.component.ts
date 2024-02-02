import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../_services/admin.service';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-post-coupons',
  templateUrl: './post-coupons.component.html',
  styleUrls: ['./post-coupons.component.scss']
})
export class PostCouponsComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private adminService: AdminService
  ) { }

  couponForm !: FormGroup;


  ngOnInit(): void {
    this.couponForm= this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      code: [null, [
        Validators.required
      ]],
      discount: [null, [
        Validators.required
      ]],
      expirationDate: [null, [
        Validators.required
      ]]
    });
  }

  addCoupon(){
    if(this.couponForm.valid){
      this.adminService.addCoupon(this.couponForm.value).subscribe(
        (response)=>{
          if(response.id){
            this.snackbar.open(`Coupon posted Successfully!`, 'close', {
              duration: 4000
            });
            this.router.navigateByUrl('admin/dashboard');
          }else{
            this.snackbar.open(`${response.message}`, 'close', {
              duration: 4000,
              panelClass: `error-snackbar`
            });
          }
        }
      );
    }else{
      this.couponForm.markAllAsTouched();
    }
  }
}
