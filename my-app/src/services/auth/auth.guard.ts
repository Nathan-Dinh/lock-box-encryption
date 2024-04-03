import { inject } from '@angular/core'
import { CanActivateFn } from '@angular/router'
import { Router } from '@angular/router'
import { AuthControlService } from '../../store/auth-store.service'

export const authGuard: CanActivateFn = (route, state) => {
  const ROUTER = inject(Router)
  const AUTH_CONTROL = inject(AuthControlService)
  if(AUTH_CONTROL.isAuth){
    return true
  }
  ROUTER.navigate(['login'])
  return false
}
