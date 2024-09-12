import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-forggetpassword',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './forggetpassword.component.html',
  styleUrl: './forggetpassword.component.scss'
})
export class ForggetpasswordComponent {
  step:number=1;
  isLoading:boolean=false;
verifyEmail:FormGroup=new FormGroup({
  email:new FormControl(null, [Validators.required,Validators.email])
});
verifyCode:FormGroup=new FormGroup({
  resetCode:new FormControl(null, [Validators.required,Validators.pattern(/^\w{6,}$/)])

});
resetPassword:FormGroup=new FormGroup({
 email:new FormControl(null, [Validators.required,Validators.email]),
 newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),

});
private readonly _AuthService=inject(AuthService);
private readonly _Router=inject(Router);
verifyEmailSub!:Subscription;
verifyCodeSub!:Subscription;
resetPasswordSub!:Subscription;
msgError:string="";

setVerifyEmail():void{
  //awl ma el user y3ml email h3mlo save w ab3to ll form number3
 let emailValue= this.verifyEmail.get('email')?.value;//gbna kda el email ele 3ml verify
this.resetPassword.get('email')?.patchValue(emailValue)//kda 3mlna 7fz ll email fe elform 3
  this.isLoading=true;
this.verifyEmailSub = this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
    next:(res)=>{
console.log(res)
if(res.statusMsg==="success"){
  this.step=2
  this.isLoading=false;

}
    },
    error:(err:HttpErrorResponse)=>{
console.log(err);
this.msgError=err.error.message
    }
  })
  
}

setVerifyCode():void{
  this.isLoading=true;
 this.verifyCodeSub =this._AuthService.setCodeVerify(this.verifyCode.value).subscribe({
    next:(res)=>{
console.log(res)
if(res.status==="Success"){
  this.step=3
  this.isLoading=false;

}
    },
    error:(err:HttpErrorResponse)=>{
console.log(err);
this.msgError=err.error.message
    }
  })
  
}
setResetPassword():void{
  this.isLoading=true;
 this.resetPasswordSub= this._AuthService.setResetPassword(this.resetPassword.value).subscribe({
    next:(res)=>{
console.log(res)
localStorage.setItem('userToken',res.token);
this._AuthService.seveUserData();
this._Router.navigate(['/home']);
this.isLoading=false;

    },
    error:(err:HttpErrorResponse)=>{
console.log(err);
this.msgError=err.error.message
    }
  })
  
}
ngOnDestroy(): void {
this.verifyEmailSub?.unsubscribe();
this.verifyCodeSub?.unsubscribe();
this.resetPasswordSub?.unsubscribe();
  
}

}
