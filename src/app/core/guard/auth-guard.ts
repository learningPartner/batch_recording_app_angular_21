import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GlobalConstant } from '../constant/Global.constant';
//upto angular 15 => service
//angualr 16 => arrwo fun 

export const authGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const localData = localStorage.getItem(GlobalConstant.LOCAL_KEY_LOGIN);
  const token = localStorage.getItem('batchToken');
  if(localData != null && !!token) {
    return true;
  } else {
    router.navigateByUrl('/login')
    return false;
  }
};
