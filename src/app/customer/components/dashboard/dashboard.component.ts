import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../_services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar
  ) { }

  productsList: any[]= [];
  searchProductForm !: FormGroup;

  ngOnInit(): void {
    this.getAllProducts();
    this.searchProductForm= this.formBuilder.group({
      title: ['', [
        Validators.required
      ]]
    })
  }

  searchProductByNameForm(){
    if(this.searchProductForm.valid){
      this.productsList= [];
      const title= this.searchProductForm.get('title')?.value;
      this.customerService.searchProductsByName(title).subscribe(
        (response: any[])=>{   
          response.forEach(element=>{
            element.processedImg= `data:image/jpeg;base64,`+element.byteImg;
            this.productsList.push(element);
          });
        }
      );
    }
  }

  getAllProducts(): void{
    this.productsList= [];
    this.customerService.getAllProducts().subscribe(
      (response: any[])=>{
        console.log("response[0]", response[0]);
        
        response.forEach(element=>{
          element.processedImg= `data:image/jpeg;base64,`+element.byteImg;
          this.productsList.push(element);
        });
      }
    );
  }

  addToCart(productId: number){
    this.customerService.addToCart(productId).subscribe(
      (response)=>{
        this.snackbar.open(`product added to cart successfully!`, 'close', {
          duration: 3000,
          politeness: `assertive`,
          panelClass: `snack-info`
        });
      },
      (error)=>{
        console.log(error.status);
        if(error.status == 409 || error.status == ' 409' ){
          this.snackbar.open(`this product is already in your cart!!`, 'close', {
            duration: 3000,
            politeness: `assertive`,
            panelClass: `snack-info`
          });
        }
        this.snackbar.open(`something went wrong`, 'close', {
          duration: 3000,
          politeness: `assertive`,
          panelClass: `snack-info`
        });
      }
    );
  }

}
