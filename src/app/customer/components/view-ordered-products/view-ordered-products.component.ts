import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../_services/customer.service';

@Component({
  selector: 'app-view-ordered-products',
  templateUrl: './view-ordered-products.component.html',
  styleUrls: ['./view-ordered-products.component.scss']
})
export class ViewOrderedProductsComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
  ) { }

  orderId: number= this.activatedRoute.snapshot.params["orderId"];
  orderedProductDetailsList: any[]= [];
  totalAmount: any;

  ngOnInit(): void {
    this.getOrderedProductDetailsByOrderId();
  }

  getOrderedProductDetailsByOrderId(): void {
    this.customerService.getOrderedProductsByOrderId(this.orderId).subscribe(
      (response)=>{
        response.productDtoList.forEach((element: any) => {
          element.processedImg= 'data:image/jpeg;base64,'+element.byteImg
          this.orderedProductDetailsList.push(element);
        });
        this.totalAmount= response.orderAmount;
      }
    );
  }

}
