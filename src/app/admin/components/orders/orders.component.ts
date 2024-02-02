import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private snackbar: MatSnackBar,
  ) { }

  orders: any;
  displayedColumns= ['trackingId', 'username', 'orderDescription', 'address', 'date', 'status', 'action']

  ngOnInit(): void {
    this.getAllPlacedOrders();
  }

  getAllPlacedOrders(): void {
    this.adminService.getAllPlacedorders().subscribe(
      (response)=>{
        console.log("response: ", response);
        this.orders= response;
      }
    );
  }

  changeOrderStatus(orderId: number, status: string): void {
    this.adminService.changeOrderStatus(orderId, status).subscribe(
      (response)=>{
        if(response.id!= null){
          this.snackbar.open(`Order Status changed to: ${status}!`, 'close', {
            duration: 4000
          });
          this.getAllPlacedOrders();
        }else{
          this.snackbar.open(`Something went wrong!`, 'close', {
            duration: 4000,
            panelClass: `snack-error`
          });
        }
        
      }
    );
  }

}
