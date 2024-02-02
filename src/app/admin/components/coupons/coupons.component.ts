import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {

  constructor(
    private adminService: AdminService
  ) { }

  coupons: any;
  displayedColumns: any= ['id', 'name', 'code', 'discount', 'expirationDate'];

  ngOnInit(): void {
    this.getAllCoupons();
  }

  getAllCoupons(): void {
    this.adminService.getAllCoupons().subscribe(
      (response)=>{
        console.log("response: ", response);
        
        this.coupons= response;
      }
    );
  }
}
