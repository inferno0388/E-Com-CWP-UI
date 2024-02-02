import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private adminService: AdminService,
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
      this.adminService.searchProductsByName(title).subscribe(
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
    this.adminService.getAllProducts().subscribe(
      (response: any[])=>{
        console.log("response[0]", response[0]);
        
        response.forEach(element=>{
          element.processedImg= `data:image/jpeg;base64,`+element.byteImg;
          this.productsList.push(element);
        });
      }
    );
  }

  deleteProduct(productId: number): void{
    this.adminService.deleteProduct(productId).subscribe(
      (response)=>{
        console.log("response: ", response);
        
        if(response == null){
          this.snackbar.open(`Product deleted successfully!`, `Close`, {
            duration: 4000
          });
          this.getAllProducts();
        }else{
          this.snackbar.open(response.message, `Close`, {
            duration: 5000,
            panelClass: `error-snackbar`
          });

        }
      }
    );
  }
}
// 03239-q