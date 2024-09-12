import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink,FormsModule,SearchPipe,CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit,OnDestroy {
  private readonly _ProductsService=inject(ProductsService);//service products
  private readonly _CartService=inject(CartService);
  private readonly _ToastrService=inject(ToastrService);
  


productList : Iproduct[]=[]; 
getAllProductSub!:Subscription//m4 hdeha intial value y3ni
text:string='';












ngOnInit(): void {//34an ash8l el api
     this.getAllProductSub =this._ProductsService.getAllProduct().subscribe({//subscribe btreturn 7aga asmha subscribtion da bykon refrence shayel el observabel ele enta btshawr 3leh dlw2tii
    next:(res) =>{
console.log(res.data);
this.productList=res.data;
    },
    error:(err) =>{
console.log(err);
    }
  });

}
ngOnDestroy(): void {//bntab2 feha el unsubscribe daymn//3uza al8ii el subscribe w na tal3a mn elcomponent
 this.getAllProductSub?.unsubscribe();// ? safty null m3naha en lw fe f3ln subscribe 7sl w kda 5las w nta 5arg a3ml unsubscribe tab lw mafe4 subscribe my3ml4 unsubsribe
}
addTocart(id:string):void{
  this._CartService.addroductPToCart(id).subscribe({
    next:(res)=>{
  console.log(res);
  this._ToastrService.success(res.message,'freshCart')
    },
    error:(err)=>{
  console.log(err);
    }
  })
  }
}
