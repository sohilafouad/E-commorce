import { CartItem } from './../../core/interfaces/iuserorder';
import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { AuthService } from '../../core/services/auth.service';
import { Iuserorder } from '../../core/interfaces/iuserorder';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {

  private readonly _OrdersService=inject(OrdersService);
  
  private readonly _AuthService=inject(AuthService);
  userId:string|null="";
  allOrders: Iuserorder[]=[]

ngOnInit(): void {
  this._AuthService.seveUserData();
 this.userId =this._AuthService.userData.id
  this._OrdersService.getUserOrders(this.userId).subscribe({
    next:(res)=>{
    console.log(res);
    this.allOrders=res;

    },error:(err)=>{
      console.log(err)
    }
    
    })
}



}
