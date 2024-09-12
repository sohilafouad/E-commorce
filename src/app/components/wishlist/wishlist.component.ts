import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { TermPipe } from '../../core/pipes/term.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [SearchPipe,UpperCasePipe,CurrencyPipe,TermPipe,RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent  implements OnInit{

  productList : Iproduct[]=[]; 
  text:string='';
  addToCartSub!:Subscription;
  addTowishListSub!:Subscription;
  wishlist:string[]=[];


  private readonly _WishlistService=inject(WishlistService);
  private readonly _CartService=inject(CartService);
  private readonly _ToastrService=inject(ToastrService);





ngOnInit(): void {
  this._WishlistService.getLoggedUserWishList().subscribe({
    next:(res)=>{

      console.log(res.data);//da gay object[]//3uza a7ulo l string[]
      this.productList=res.data
      const newData=res.data.map((item:any)=>item.id);
    
      console.log('new data:', newData)
      this.wishlist=newData;
        },
        error:(err)=>{
      console.log(err);
        }
  })
  
}
addTocart(id:string):void{
  this.addToCartSub=this._CartService.addroductPToCart(id).subscribe({
   next:(res)=>{
 console.log(res);
 this._ToastrService.success(res.message,'freshCart')
 
   },
   error:(err)=>{
 console.log(err);
   }
 })
 }
 addToWishList(id:string):void{
  this.addTowishListSub=this._WishlistService.addProductToWishkist(id).subscribe({
   next:(res)=>{
     console.log(res);
     this._ToastrService.success(res.message,'freshCart');
     this.wishlist=res.data;
 
   },error:(err)=>{
     console.log(err)
   }
 })
 }

 removeFromWishList(id:string):void{
  this._WishlistService.removeProductFromWishList(id).subscribe({
    next:(res)=>{
console.log(res);
this.wishlist=res.data;
this._ToastrService.error(res.message,'freshCart');


// this._WishlistService.getLoggedUserWishList().subscribe({ //3mlna kda 34an lma n3ml remove el product ytshal mn el component bs 7al m4 7lw l2n bya5od w2t fe rl response
//   next:(res)=>{

//     console.log(res.data);//da gay object[]//3uza a7ulo l string[]
//     this.productList=res.data
//       },
//       error:(err)=>{
//     console.log(err);
//       }
// })

const newWishList=this.productList.filter((item:any)=>this.wishlist.includes(item._id))

this.productList=newWishList; //el wish list b3d ma 3mlna filteration

    },
    error:(err)=>{
console.log(err)
    }
  })
 }

}
