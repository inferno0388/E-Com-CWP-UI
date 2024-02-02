import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../_services/admin.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private adminService: AdminService,
    private activatedPoute: ActivatedRoute,

  ) { }

  
  productId: number= this.activatedPoute.snapshot.params["productId"];
  productForm !: FormGroup;
  listOfCategories: any[]= [];
  selectedFile !: File| null;
  imagePreview !:  string | ArrayBuffer | null;

  existingImage !:  string | ArrayBuffer | null;
  imageChanged: boolean= false;
  
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
    this.getProductById();
  }

  onFileSelected(event: any){
    this.selectedFile= event.target.files[0];
    this.previewImage();
    this.imageChanged= true;
    this.existingImage= null;

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

  updateProduct(): void{
    if(this.productForm.valid){
      const formData= new FormData();

      if(this.imageChanged && this.selectedFile){
        formData.append('img', this.selectedFile!);
      } 
      formData.append('categoryId', this.productForm.get('categoryId')?.value);
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);

      this.adminService.updateProduct(this.productId, formData).subscribe(
        (response)=>{
          if(response.id!= null){
            this.snackbar.open(`Product Updated Successfully!`, `close`, {
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

  getProductById(){
    this.adminService.getProductbyId(this.productId).subscribe(
      (response)=>{
        this.productForm.patchValue(response);
        this.existingImage= 'data:image/jpeg;base64,'+response.byteImg;
      }
    );
  }

}
