import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userData:any=null;//3mlt property global 34an de ele h5zn feha el token b3d el decode w ast5dmha f ae mkan ana 3yzah
private readonly _Router=inject(Router);//n3ml navigate ll login

  constructor() { }
 private readonly _HttpClient=inject(HttpClient) //kda 3mlt inject l service HttpClient 34an at3aml m3a el api
 setRegisterForm(data:object) :Observable<any>//function l API el register
 {

  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
 }
 setLoginForm(data:object):Observable<any>{//function l API el login
return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
 }
 seveUserData():void{//function l decode el token bta3 el user
if(localStorage.getItem('userToken') !== null){


this.userData=   jwtDecode(localStorage.getItem('userToken')! )
// console.log('userData:', this.userData)


//hena b2olo lw f3ln 3ndk userToken fe el local storage htha w a3mlha decode // leh 7taet ! 34an ablah kan darb error 34am by2olo en mommkn yb2a el token b null fa el3lma de kda b2olo la feh data gaya aked w kman 3mla if condition 34an a2olo en mfe4 null
//kan mommkn a3ml kda bdl !//---> let hamda:any=localStorage.getItem('userToken') ,jwtdecode(hamada) //bs la el ! a7sn
}
 }
 logOut():void{//function l logout// btms7 m3lomat eluser lma y3ml logout w t navigate to login tani b2a
  localStorage.removeItem('userToken');
this.userData=null;
//mfrod hena ast5dm api 5as b remove eltoken mn 3nd elback kman
this._Router.navigate(['/login'])
 }
 setEmailVerify(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
 }
 setCodeVerify(data:object) :Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
 }
 setResetPassword(data:object):Observable<any>{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
 }
}
