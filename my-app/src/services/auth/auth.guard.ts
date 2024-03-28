import { inject } from '@angular/core'
import { CanActivateFn } from '@angular/router'
import { Router } from '@angular/router'

export const authGuard: CanActivateFn = (route, state) => {
  const ROUTER = inject(Router)
  ROUTER.navigate(['login'])
  return false
}
