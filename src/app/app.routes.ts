import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { authGuard } from './core/guards/auth.guard';
import { preventloginGuard } from './core/guards/preventlogin.guard';
import { DetailsComponent } from './components/details/details.component';
import { CategorydetailsComponent } from './components/categorydetails/categorydetails.component';
import { ForggetpasswordComponent } from './components/forggetpassword/forggetpassword.component';
import { AllordersComponent } from './compnents/allorders/allorders.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

export const routes: Routes = [
    //auth------>login-registar
    {path:"",component:AuthLayoutComponent,canActivate:[preventloginGuard],children:[//lw msgl d5ol hmn3oo yro7 l authrouter
        {path:"",redirectTo:"login",pathMatch:"full"},
        {path:"login",component:LoginComponent},
        {path:"register",component:RegisterComponent},
        {path:"forget",component:ForggetpasswordComponent}
    ]
    },
    //blank-------->home,brands,categories,cart,products
    {path:"",component:BlankLayoutComponent,canActivate:[authGuard]  ,children:[//canActivate:[authGuard]  ya bn7otha 3la elblank kolo y kol bath lw7da 3adi//m4 hyd5ol hena el ;w 3aml log in
        {path:"",redirectTo:"home",pathMatch:"full"},
        {path:"home",component:HomeComponent},
        {path:"products",component:ProductComponent},
        {path:"cart",component:CartComponent},
        {path:"brands",component:BrandsComponent},
        {path:"categories",component:CategoriesComponent},
        {path:"details/:id",component:DetailsComponent},
        {path:"categorydetails/:_id",component:CategorydetailsComponent},
        {path:"allorders" , component:AllordersComponent},
        {path:"orders/:id" , component:OrdersComponent},
        {path:"wishlist" , component:WishlistComponent},


    ]

    },
    {path:"**",component:NotfoundComponent}
];
