import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/_services/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private httpClient: HttpClient
  ) { }
  BASIC_URL: string= `http://localhost:8081`;

  getAllProducts(): Observable<any>{
    return this.httpClient.get(`${this.BASIC_URL}/api/customer/getAllProducts`,{
      headers: this.createAuthorizationHeader(),
    });
  }

  searchProductsByName(name: string): Observable<any>{
    return this.httpClient.get(`${this.BASIC_URL}/api/customer/search/${name}`,{
      headers: this.createAuthorizationHeader(),
    });
  }

  addToCart(productId: number): Observable<any>{
    const cartDto= {
      productId: productId,
      userId: UserStorageService.getUserId()
    }
    return this.httpClient.post(`${this.BASIC_URL}/api/customer/cart`, cartDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getCartByUserId(): Observable<any>{
    
    const userId= UserStorageService.getUserId();
    
    return this.httpClient.get(`${this.BASIC_URL}/api/customer/cart/${userId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  applyCoupon(code: any): Observable<any>{
    
    const userId= UserStorageService.getUserId();
    
    return this.httpClient.get(`${this.BASIC_URL}/api/customer/coupon/${userId}/${code}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  placeOrder(orderDto: any): Observable<any>{

    orderDto.userId= UserStorageService.getUserId();
 
    return this.httpClient.post(`${this.BASIC_URL}/api/customer/placeOrder`, orderDto,  {
      headers: this.createAuthorizationHeader(),
    });
  }

  increaseProductQuantity(productId: number): Observable<any>{
    const cartDto= {
      productId: productId,
      userId: UserStorageService.getUserId()
    }
    return this.httpClient.post(`${this.BASIC_URL}/api/customer/addition`, cartDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getOrderbyUserId(): Observable<any>{
    const userId= UserStorageService.getUserId();
 
    return this.httpClient.get(`${this.BASIC_URL}/api/customer/user-orders/${userId}`,  {
      headers: this.createAuthorizationHeader(),
    });
  }

  decreaseProductQuantity(productId: number): Observable<any>{
    const cartDto= {
      productId: productId,
      userId: UserStorageService.getUserId()
    }
    return this.httpClient.post(`${this.BASIC_URL}/api/customer/deduction`, cartDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getOrderedProductsByOrderId(orderId: number): Observable<any>{
 
    return this.httpClient.get(`${this.BASIC_URL}/api/customer/ordered-products/${orderId}`,  {
      headers: this.createAuthorizationHeader(),
    });
  }

  createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', `Bearer ${UserStorageService.getToken()}`
    );
  }
}
