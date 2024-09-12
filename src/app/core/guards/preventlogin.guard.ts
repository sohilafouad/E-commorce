import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const preventloginGuard: CanActivateFn = (route, state) => {

  const _Router=inject(Router);
    const _PLATFORM_ID=inject(PLATFORM_ID)


  if(isPlatformBrowser(_PLATFORM_ID)){
    if(localStorage.getItem('userToken')!==null){//hena lw f3ln 3aml log in hmn3o yro7 l login w registar tani w yro7 ll home
      _Router.navigate(['/home'])
    
    return false;
    }
    else{//lw m4 3aml yro7 l login tani
    return true; 
    }

  }else{//3mlna return 34an elguard lazm return lakn lw ae 7aga tanya hn3ml check bs
    return false;
  }

};
