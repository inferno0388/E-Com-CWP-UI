import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../_services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) { }
  orderForm !: FormGroup;

  ngOnInit(): void {
    this.orderForm= this.formBuilder.group({
      address: [null, [
        Validators.required
      ]],
      orderDescription: [null]
    })
  }

  placeOrder(): void {
    this.customerService.placeOrder(this.orderForm.value).subscribe(
      (response)=>{
        if(response.id != null){
          this.snackbar.open(`product added to cart successfully!`, 'close', {
            duration: 3000,
            politeness: `assertive`,
            panelClass: `snack-info`
          });
          this.router.navigateByUrl("/customer/my-orders");
          this.closeForm();
        }else{
          this.snackbar.open(`Something went wrong!`, 'close', {
            duration: 3000,
            politeness: `assertive`,
            panelClass: `snack-error`
          });
        }
      }
    );
  }

  closeForm(): void {
    this.dialog.closeAll();
  }

}
