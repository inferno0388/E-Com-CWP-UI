import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../_services/admin.service';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private adminService: AdminService
  ) { }

  productForm !: FormGroup;
  listOfCategories: any[]= [];
  selectedFile !: File| null;
  imagePreview !:  string | ArrayBuffer | null;

  ngOnInit(): void {
    this.productForm= this.formBuilder.group({
      categoryId: [null, [
        Validators.required
      ]],
      name: ['', [
        Validators.required
      ]],
      price: [null, [
        Validators.required
      ]],
      description: ['', [
        Validators.required
      ]]
    });

    this.getAllCategories();
  }

  onFileSelected(event: any){
    this.selectedFile= event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader= new FileReader();
    reader.onload=() =>{
      this.imagePreview= reader.result;
    }
    reader.readAsDataURL(this.selectedFile!);
  }

  getAllCategories(): void{
    this.adminService.getAllCategories().subscribe(
      (response: any)=>{
        this.listOfCategories= response;
      }
    );
  }

  addProduct(): void{
    if(this.productForm.valid){
      const formData= new FormData();
      formData.append('img', this.selectedFile!);
      formData.append('categoryId', this.productForm.get('categoryId')?.value);
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);

      this.adminService.addProduct(formData).subscribe(
        (response)=>{
          if(response.id!= null){
            this.snackbar.open(`Product Posted Successfully!`, `close`, {
              duration: 3000
            });
            this.router.navigateByUrl("admin/dashboard")
          }else{
            this.snackbar.open(`${response.message}`, `ERROR`, {
              duration: 3000
            });
          }
        }
      );

    }else{
      for(const i in this.productForm.controls){
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }
  }

}
