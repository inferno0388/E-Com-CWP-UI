import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/_services/user-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private httpClient: HttpClient
  ) { }
  BASIC_URL: string= `http://localhost:8081`;

  addCategory(categoryDto: any): Observable<any>{
    return this.httpClient.post(`${this.BASIC_URL}/api/admin/category`,categoryDto,{
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllCategories(): Observable<any>{
    return this.httpClient.get(`${this.BASIC_URL}/api/admin/getAllCategories`,{
      headers: this.createAuthorizationHeader(),
    });
  }

  addProduct(productDto: any): Observable<any>{
    return this.httpClient.post(`${this.BASIC_URL}/api/admin/product`,productDto,{
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllProducts(): Observable<any>{
    return this.httpClient.get(`${this.BASIC_URL}/api/admin/getAllProducts`,{
      headers: this.createAuthorizationHeader(),
    });
  }

  searchProductsByName(name: string): Observable<any>{
    return this.httpClient.get(`${this.BASIC_URL}/api/admin/search/${name}`,{
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteProduct(productId: number): Observable<any>{
    return this.httpClient.delete(`${this.BASIC_URL}/api/admin/deleteProduct/${productId}`,{
      headers: this.createAuthorizationHeader(),
    });
  }

  //coupons
  addCoupon(couponDto: any): Observable<any>{
    return this.httpClient.post(`${this.BASIC_URL}/api/admin/coupon`,couponDto,{
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllCoupons(): Observable<any>{
    return this.httpClient.get(`${this.BASIC_URL}/api/admin/getAllCoupons`,{
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllPlacedorders(): Observable<any>{
    return this.httpClient.get(`${this.BASIC_URL}/api/admin/placed-orders`,{
      headers: this.createAuthorizationHeader(),
    });
  }

  changeOrderStatus(orderId: number, status: string): Observable<any>{
    return this.httpClient.get(`${this.BASIC_URL}/api/admin/order-status/${orderId}/${status}`,{
      headers: this.createAuthorizationHeader(),
    });
  }

  postFAQForProduct(productId: number, faqDto: any): Observable<any>{
    return this.httpClient.post(`${this.BASIC_URL}/api/admin/faq/${productId}`, faqDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getProductbyId(productId: number): Observable<any>{
    return this.httpClient.get(`${this.BASIC_URL}/api/admin/get-product/${productId}`,{
      headers: this.createAuthorizationHeader(),
    });
  }

  updateProduct(productId: number,productDto: any): Observable<any>{
    return this.httpClient.put(`${this.BASIC_URL}/api/admin/product/${productId}`,productDto,{
      headers: this.createAuthorizationHeader(),
    });
  }








  // 1622584221  Goa

  createAuthorizationHeader(): HttpHeaders{
    return new HttpHeaders().set(
      'Authorization', `Bearer ${UserStorageService.getToken()}`
    );
  }
}
