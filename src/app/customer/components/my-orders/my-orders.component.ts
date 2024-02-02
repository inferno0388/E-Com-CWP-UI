import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../_services/customer.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  constructor(
    private customerService: CustomerService,
  ) { }

  displayedColumns= ['trackingId', 'amount', 'orderDescription', 'address', 'date', 'orderStatus', 'action'];
  myOrders: any[]= [];

  ngOnInit(): void {
    this.getMyOrders();
  }

  getMyOrders(): void{
    this.customerService.getOrderbyUserId().subscribe(
      (response)=>{
        console.log("response: ", response);
        
        this.myOrders= response;
      }
    );
  }

}
