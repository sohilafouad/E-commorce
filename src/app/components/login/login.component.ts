import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgClass,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  msgError:string="";//property tshel el error ele gay mn elbackend
  isLoading:boolean=false;//de 34an elspiner (3lamt elt7mel loading y3ni ele hya shakl 3la ama eldata tegii mn elback)
  msgSuccess:boolean=false;
  loginSub!:Subscription;

private readonly _AuthService=inject(AuthService);//kda 3mlt inject l service ele feh httpclient(api)

private readonly _FormBuilder=inject(FormBuilder);//kda 3mlt inject l service 34an a3ml el form btar2a gdeda 

private readonly _Router=inject(Router);//kda 3mlt inject l service mn 5lalo h3ml router link to login


loginForm:FormGroup=this._FormBuilder.group({ //de b2a tar2a gdeda n3ml beha form mn 5lal servic FormBuilder
  // email:this._FormBuilder.control//da syntax re5m awi
  email:[null,[Validators.required ,Validators.email]],//[] da kda y3ne control
  password:[null,[Validators.pattern(/^\w{6,}$/),Validators.required]],
 
}) //{validators:this.confirmPassword} da 3bara 3n object mommkn ya5od aktr mn custom validation

  // registerForm:FormGroup=new FormGroup({
  //   name:new FormControl(null, [Validators.required ,Validators.minLength(3),Validators.maxLength(20)]),//Validators da object 5as b elvalidation w 3ndo elmethod ghza
  //   email: new FormControl(null,[Validators.required ,Validators.email]),
  //   password:new FormControl(null,[Validators.pattern(/^\w{6,}$/),Validators.required]),//da kda m3nah en ana ele h3ml el validation using regex
  //   rePassword:new FormControl(null),//rePassword  lazm a3mlo fun(custom validation) 34an lazm yb2a match m3a elpassword m4 hynf3 ast5dm [Validators.pattern(/^\w{6,}$/),Validators.required]
  //   phone:new FormControl(null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  // } ,this.confirmPassword);
  //formgroup() bta5od aktr mn parameter 3adi awl wa7d el conrols w eltanii custom validation//bs de taria adema
  
 loginSubmit():void{
    this.isLoading=true;//awl ma n3ml submit elspinner tsht8l (tzhr y3ni)
    if(this.loginForm.valid){
 this.loginSub  = this._AuthService.setLoginForm(this.loginForm.value).subscribe({
      next:(res)=>{//elresponse rg3 tmam yb2a a5zn el token bta3 eluser w b3den a3ml navigate to home

console.log(res)//response byrg3 3la hy2t object feh property esmha message
   
    if(res.message ==='success'){
      this.msgSuccess=true; //alert y3ni en eldonya tmam

localStorage.setItem('userToken',res.token);//hena 3mlna save l eltoken fe localstorage tmam kda//setitem kant bta5od mni 2 parameters//name ele h5zn feh w el data
this._AuthService.seveUserData()//b3d ma et5zn el token fe el local storage 3mlna decode leh
      this._Router.navigate(['/home']) ; //using el service to navigate to home leh est5dmna el / 34an a2olo abda2 mn bath el home
    }
this.isLoading=false;//eldata gt elspinner y5tfii
      },
      error:(err:HttpErrorResponse) =>{
        this.msgError=err.error.message
console.log(err)
this.isLoading=false;//eldata gt elspinner y5tfii
      }
    })

     
     // console.log(this.registerForm.value)
    }
    //3mlt if condition 34an a5lii eluser my8yr4 fe 7aga mn elhtml lma yft7 elconsole wlw shal mn 3nd elconsole disabled brdo m4 hy2dr y3ml submit ela lw el data sa7
// console.log(this.registerForm.value);
//da hygeb el object ele feh eldata ele httb3t L api

}
ngOnDestroy(): void {
this.loginSub?.unsubscribe();
  
}


}
