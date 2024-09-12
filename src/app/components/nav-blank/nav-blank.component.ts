import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent {
 readonly _AuthService=inject(AuthService); // kan mktop private abl read only sheltha 34an aaol ll method 3la tol fe el html
  // hamada():void{
  //   this._AuthService.logOut();
  // }


}
