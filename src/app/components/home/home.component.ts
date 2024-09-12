import { SalePipe } from './../../core/pipes/sale.pipe';

import { Subscription } from 'rxjs';
import { Iproduct } from '../../core/interfaces/iproduct';
import { ProductsService } from './../../core/services/products.service';

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe} from '@angular/common';
import { TermPipe } from '../../core/pipes/term.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink,FormsModule,UpperCasePipe,LowerCasePipe,TitleCasePipe,DatePipe,SlicePipe,CurrencyPipe,JsonPipe,SalePipe,TermPipe,SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit , OnDestroy {
  private readonly _ProductsService=inject(ProductsService);//service products
  private readonly _CategoriesService=inject(CategoriesService);//service categories
  private readonly _CartService=inject(CartService);//service cart
  private readonly _ToastrService=inject(ToastrService);
  private readonly _WishlistService=inject(WishlistService)
productList : Iproduct[]=[]; 
getAllProductSub!:Subscription//m4 hdeha intial value y3ni
categoriesList:Icategory[]=[];
text:string='';
addToCartSub!:Subscription;
getAllCtegoriesSub!:Subscription;
addTowishListSub!:Subscription;
wishlist:string[]=[];


customOptionsCat : OwlOptions  = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  autoplay:true,
   autoplayTimeout:2000,
   autoplayHoverPause:true,
  dots: true,
  navSpeed: 700,
  navText: ['prev', 'next'],
  responsive: {
    0: {
      items: 1
    },
   500: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}
customOptionsMain : OwlOptions  = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  autoplay:true,
   autoplayTimeout:2000,
   autoplayHoverPause:true,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
 items:1,
  nav: false
}


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
  this.getAllCtegoriesSub  =this._CategoriesService.getAllCategories().subscribe({
  next:(res) => {
console.log(res.data);
this.categoriesList=res.data;
  },
  error:(err) =>{
    console.log(err);
  }
});
this._WishlistService.getLoggedUserWishList().subscribe({
  next:(res)=>{
    console.log(res.data);//da gay object[]//3uza a7ulo l string[]
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
this._ToastrService.error(res.message,'freshCart');
this.wishlist=res.data;
    },
    error:(err)=>{
console.log(err)
    }
  })
 }


ngOnDestroy(): void {//bntab2 feha el unsubscribe daymn//3uza al8ii el subscribe w na tal3a mn elcomponent
 this.getAllProductSub?.unsubscribe();
 // ? safty null m3naha en lw fe f3ln subscribe 7sl w kda 5las w nta 5arg a3ml unsubscribe tab lw mafe4 subscribe my3ml4 unsubsribe
this.addToCartSub?.unsubscribe();
this.getAllCtegoriesSub?.unsubscribe();
this.addTowishListSub?.unsubscribe();
}


}
// JsonPipe da lma a7b a3rd object fe elhtml,