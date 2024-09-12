import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  
  msgError:string="";//property tshel el error ele gay mn elbackend
  isLoading:boolean=false;//de 34an elspiner (3lamt elt7mel loading y3ni ele hya shakl 3la ama eldata tegii mn elback)
  registerSub !:Subscription;

private readonly _AuthService=inject(AuthService);//kda 3mlt inject l service ele feh httpclient(api)

private readonly _FormBuilder=inject(FormBuilder);//kda 3mlt inject l service 34an a3ml el form btar2a gdeda 

private readonly _Router=inject(Router);//kda 3mlt inject l service mn 5lalo h3ml router link to login


registerForm:FormGroup=this._FormBuilder.group({ //de b2a tar2a gdeda n3ml beha form mn 5lal servic FormBuilder
  // name:this._FormBuilder.control//da syntax re5m awi
  name:[null,[Validators.required ,Validators.minLength(3),Validators.maxLength(20)]],//[] da kda y3ne control
  email:[null,[Validators.required ,Validators.email]],
  password:[null,[Validators.pattern(/^\w{6,}$/),Validators.required]],
  rePassword:[null],
  phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]]
},{validators:this.confirmPassword}) //{validators:this.confirmPassword} da 3bara 3n object mommkn ya5od aktr mn custom validation

  // registerForm:FormGroup=new FormGroup({
  //   name:new FormControl(null, [Validators.required ,Validators.minLength(3),Validators.maxLength(20)]),//Validators da object 5as b elvalidation w 3ndo elmethod ghza
  //   email: new FormControl(null,[Validators.required ,Validators.email]),
  //   password:new FormControl(null,[Validators.pattern(/^\w{6,}$/),Validators.required]),//da kda m3nah en ana ele h3ml el validation using regex
  //   rePassword:new FormControl(null),//rePassword  lazm a3mlo fun(custom validation) 34an lazm yb2a match m3a elpassword m4 hynf3 ast5dm [Validators.pattern(/^\w{6,}$/),Validators.required]
  //   phone:new FormControl(null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  // } ,this.confirmPassword);
  //formgroup() bta5od aktr mn parameter 3adi awl wa7d el conrols w eltanii custom validation//bs de taria adema
  
  registerSubmit():void{
    this.isLoading=true;//awl ma n3ml submit elspinner tsht8l (tzhr y3ni)
    if(this.registerForm.valid){
  this.registerSub   =this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
      next:(res)=>{
console.log(res)//response byrg3 3la hy2t object feh property esmha message
   
    if(res.message ==='success'){
      this._Router.navigate(['/login'])  //using el service to navigate to login leh est5dmna el / 34an a2olo abda2 mn bath el login
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

} ngOnDestroy(): void {
this.registerSub?.unsubscribe();
  
}


confirmPassword(g:AbstractControl){
if(g.get('password')?.value=== g.get('rePassword')?.value){
return null//hena b2olo lw el etnen bysawo b3d rg3 null mfe4 error y3nii
}else{
  return{mismatch:true}//kda feh error esmo mismatch true 3yni mogod
}
}

//bgrb 7war en ab3t data gwa form using patchvalue,setvalue //batchvalue m4 shart a3ml set llvalues kolha 3adi lakn setvalues lazm ad5l eldata kolha
// dataForm={
// name:'sohila',
// email:'sohilafouad11@gmail.com',
// password:'123456789',
// rePassword:'123456789',
// phone:'01220351546'
// }
// ngOnInit(): void {
// this.registerForm.setValue({
//   name:this.dataForm.name,
// email:this.dataForm.email,
// password:this.dataForm.password,
// rePassword:this.dataForm.rePassword,
// phone:this.dataForm.phone
// })
  
// }

}
