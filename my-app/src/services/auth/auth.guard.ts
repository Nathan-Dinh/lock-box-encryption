import { inject } from '@angular/core'
import { CanActivateFn } from '@angular/router'
import { Router } from '@angular/router'
import { AuthControlService } from '../../store/auth-store.service'

export const authGuard: CanActivateFn = (route, state) => {
  const ROUTER: Router = inject(Router)
  const AUTH_CONTROL: AuthControlService = inject(AuthControlService)

  if(AUTH_CONTROL.getAuth()){
    return true
  }else{
    ROUTER.navigate(['login'])
    return false
  }
}
