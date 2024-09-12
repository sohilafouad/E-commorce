import { ProductsService } from './../../core/services/products.service';
import { Component, inject, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  detailsSub!:Subscription;
 // productDetails:Iproduct={} as Iproduct;//3MLNA kda 34an el data mn no3 {object m4 array w iproduct interface []}
 
 productDetails:Iproduct|null=null; //7al tanii

private readonly _ActivatedRoute=inject(ActivatedRoute);  //service mn 5lalha hs7b el id ele fe el routing 34an a3rdo fe eldetails
private readonly _ProductsService=inject(ProductsService);
private readonly _CartService=inject(CartService);
private readonly _ToastrService=inject(ToastrService);


ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next: (res)=>{
let productId=(res.get('id'))//hena bngeb el id ele bykon gmb eldetails fe el url w b3den a3ml call l api
 this.detailsSub  =this._ProductsService.getSpecificProduct(productId).subscribe({
  next:(res)=>{
    console.log(res.data)
    this.productDetails=res.data
  },
  error:(err)=>{

  console.log(err)
  }
})
    }

    

  })//paramMap mn no3 observable fa 34an yshta8l lazm a3mlo subscribe 34an da hyttb3 ae ta8er hy7sl 3nde w ysm3 fe el component

}
ngOnDestroy(): void {
  
  this.detailsSub?.unsubscribe
}


customOptionsDet : OwlOptions  = {
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
