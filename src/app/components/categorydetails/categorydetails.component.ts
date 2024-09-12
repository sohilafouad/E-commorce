import { CategoriesService } from './../../core/services/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Icategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [],
  templateUrl: './categorydetails.component.html',
  styleUrl: './categorydetails.component.scss'
})
export class CategorydetailsComponent implements OnInit {
  private readonly _ActivatedRoute=inject(ActivatedRoute); 

  private readonly _CategoriesService=inject(CategoriesService);
  categorySub!:Subscription;
  categoryId:string|null='';
  categoryDetails : Icategory|null=null;


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
   next:(res)=>{
   this.categoryId=(res.get('_id'));
   this.categorySub=this._CategoriesService.getSpecificCategory(this.categoryId).subscribe({
next:(res)=>{
console.log(res);
this.categoryDetails=res.data;
}
   })
   },
   error:(err)=>{
console.log(err)
   }
    })
  }
  ngOnDestroy(): void {
  this.categorySub?.unsubscribe()
    
  }
}
