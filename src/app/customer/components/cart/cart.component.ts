import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../_services/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PlaceOrderComponent } from '../place-order/place-order.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }
  cartItems: any[]= [];
  order: any;
  couponForm!: FormGroup;

  ngOnInit(): void {

    this.couponForm= this.formBuilder.group({
      code: [null, [
        Validators.required
      ]]
    });

    this.getCartItemsForUser();
  }

  applyCoupon(){
    this.customerService.applyCoupon(this.couponForm.get('code')?.value).subscribe(
      (response: any)=>{
        this.snackbar.open(`Coupon applied successfully!`, 'close', {
          duration: 3000,
          politeness: `assertive`,
          panelClass: `snack-info`
        });
        this.getCartItemsForUser();
      }, (error)=>{
        this.snackbar.open(`${error.error}`, 'close', {
          duration: 3000,
          politeness: `assertive`,
          panelClass: `snack-error`
        });
      }
    );
  }

  getCartItemsForUser(): void {
    this.cartItems= [];
    this.customerService.getCartByUserId().subscribe(
      (response)=>{
        console.log("response: ", response);
        
        this.order= response;
        response.cartItems.forEach(
          (element: any)=> {
            element.processedImg= `data:image/jpeg;base64,`+ element.returnedImg;
            this.cartItems.push(element);
          }
        );
      }
    );
  }

  increaseQuantity(productId: any): void {
    
    this.customerService.increaseProductQuantity(productId).subscribe(
      (response)=>{
        this.snackbar.open(`Product quantity increased!`, 'close', {
          duration: 3000,
          politeness: `assertive`,
          panelClass: `snack-info`
        });
        this.getCartItemsForUser();
      }
    );
  }

  decreaseQuantity(productId: any): void {
    
    this.customerService.decreaseProductQuantity(productId).subscribe(
      (response)=>{
        this.snackbar.open(`Product quantity decreased!`, 'close', {
          duration: 3000,
          politeness: `assertive`,
          panelClass: `snack-info`
        });
        this.getCartItemsForUser();
      }
    );
  }

  placeOrder(): void {
    this.dialog.open(PlaceOrderComponent);
  }

}
