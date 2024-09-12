import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly _CartService=inject(CartService);
  private readonly _ToastrService=inject(ToastrService);
  getCartSub!:Subscription;
  removeItemSub!:Subscription;
  updateCountSub!:Subscription;
  clearCartSub!:Subscription

  cartDetails:Icart= {} as Icart;
  ngOnInit(): void {
   this.getCartSub= this._CartService.getProductCart().subscribe({
      next:(res)=>{
console.log(res.data);
this.cartDetails=res.data;
      },
      error:(err)=>{
console.log(err)
      }
    })
      
    
  }
removeItem(id:string):void{
 this. removeItemSub =this._CartService.deleteSpecificCartItem(id).subscribe({
    next:(res)=>{
console.log(res);
this.cartDetails=res.data;
this._ToastrService.success('you removed this product from your cart!','FreshCart')
    },
    error:(err)=>{
console.log(err)
    }
  })
}
updateCount(id:string , count:number ):void{
 this.updateCountSub   = this._CartService.updataProductQuantity(id , count).subscribe({
  next:(res)=>{
console.log(res),
this.cartDetails=res.data;
  },
  error:(err)=>{
console.log(err)
  }
})
}
clearItems():void{
  this.clearCartSub= this._CartService.clearCart().subscribe({
    next:(res)=>{
console.log(res);
if(res.message =='success'){
this.cartDetails= {} as Icart//object fadii y3nii
}
    },
    error:(err)=>{
console.log(err)
    }
  })

}
alertWithSuccess(){
  Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
}
  confirmBox(){
  Swal.fire({
    title: 'Are you sure want to remove?',
    text: 'You will not be able to recover this file!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Deleted!',
        'Your imaginary file has been deleted.',
        'success'
      );
      this.clearItems();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    };

  })
}
ngOnDestroy(): void {
this.getCartSub?.unsubscribe();
this. removeItemSub?.unsubscribe();
this.updateCountSub?.unsubscribe();
this.clearCartSub?.unsubscribe();
  
}
 
}
