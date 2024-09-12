import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => { //route feh kol elm3lomat el5saa b elrouting el 7alii,,, state shayel el path bs
 const _Router=inject(Router)
if(typeof localStorage !== 'undefined'){//check en local storage f3ln mogoda  f3ln sh8l code el guard da m3nah enha 3la elbrowser
  if(localStorage.getItem('userToken') !== null){//hena b2olo lw fe user 3ml login w kda f3ln feh token 5las d5lo 3la el  route
    return true;
    } else{//hrg3o kman l el login
      _Router.navigate(['/login']);// ms5dmna4 this._router l2n de function m4 class
      return false;
    }
}else{ //da m3nah enha 3nd elserver w elservr m3ndo4 local storage 
  return false;
}


};
//b3daha baro7 l routing ele 3uza atab2 3leh el guard w a6to 3leh 34an y7meh mn en ae 7ad yro7 3ndo lazmm y3ml login el2oll
