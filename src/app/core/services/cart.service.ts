import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
myHeaders:any={token:localStorage.getItem('userToken')};
 //h3ml el injection ll httpclint el mra de gwa el constructor
  constructor(private _HttpClient:HttpClient) { };
  addroductPToCart(id:string):Observable<any>{
    //post btkon 3uza 3 params==> 2 required(url and el body) ,==>1 optional(headers===> key:token , value)
return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,
  {//da el body ele el api 3uzoo
   "productId": id
},
{
headers:this.myHeaders
}
)
  }
  getProductCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,
      {
        headers:this.myHeaders
      }
    )

  }
  deleteSpecificCartItem(id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
headers:this.myHeaders
      }
    )
  }
  updataProductQuantity(id:string ,newCount:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
{
 "count":newCount
},{
  headers:this.myHeaders
}
   
  )
  }
  clearCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,
      {
        headers:this.myHeaders
      }
    )
  }
 //note: -post,put===>url,body,headers(option)
 //-get,delete===>url ,headers(option)
}
