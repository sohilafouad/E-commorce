import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Subscription } from 'rxjs';
import { Icategory } from '../../core/interfaces/icategory';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  private readonly _CategoriesService=inject(CategoriesService);
  categoriesSub!:Subscription;
  categoriesList:Icategory[]=[];
  ngOnInit(): void {
 this.categoriesSub   =this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
console.log(res)
this.categoriesList=res.data;
      },
      error:(err)=>{
console.log(err)
      }
    })
    
  }
  ngOnDestroy(): void {
 
    this.categoriesSub?.unsubscribe;
  }

}
