import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../_services/admin.service';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss']
})
export class PostCategoryComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private adminService: AdminService
  ) { }

  categoryForm !: FormGroup;

  ngOnInit(): void {
    this.categoryForm= this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required
      ]]
    });
  }

  addCategory(): void{

    if(this.categoryForm.valid){
      this.adminService.addCategory(this.categoryForm.value).subscribe(
        (result)=>{
          if(result.id != null){
            this.snackbar.open(`Category posted Successfully!`, 'close', {
              duration: 4000
            });
            this.router.navigateByUrl('admin/dashboard');
          }else{
            this.snackbar.open(`${result.message}`, 'close', {
              duration: 4000,
              panelClass: 'error-snackbar'
            });
          }
        },
        (error)=>{
          console.log(error);   
        }
      );
    }else{
      this.categoryForm.markAllAsTouched();
    }
  }

}
