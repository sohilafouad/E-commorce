import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
private readonly _ActivatedRoute=inject(ActivatedRoute);
private readonly _OrdersService=inject(OrdersService);

cartId:string|null="";
orderSub!:Subscription


orders:FormGroup=new FormGroup({
  details: new FormControl(null,[Validators.required]),
  phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  city: new FormControl(null,[Validators.required])
})
orderSubmit():void{
  console.log(this.orders.value);
   this.orderSub= this._OrdersService.checkOut(this.cartId ,this.orders.value).subscribe({
    next:(res)=>{
      console.log(res);
      if(res.status === "success") 
        {
          //res.session.url;//link el strip ele byt,=mn mno el checkout //34an afrt7ah b3ml method gwa el window
          window.open(res.session.url,'_self')//de zaii el anchor tag <a>//ytft7 fe nafs el tap
        }
    }, error:(err)=>{

    }
  })










}





ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
this.cartId=params.get('id');
console.log(this.cartId)
    },
    error:()=>{
    }
  })
  
}
ngOnDestroy(): void {
  this.orderSub?.unsubscribe();
    
  }
  

}
