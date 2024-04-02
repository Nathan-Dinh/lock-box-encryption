import { Injectable, inject } from '@angular/core'
import { CookieEncryptionService } from '../crypto/cookie-encryption.service'
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root',
})
export class AuthControlService {
  ceService = inject(CookieEncryptionService)
  cService = inject(CookieService)
  isAuth = false
  constructor() {
    const COOKIE : string = this.cService.get('session') as string
    if (COOKIE !== '') {
      this.isAuth = true
    }
  }
  authorize() {
    this.isAuth = true
  }
  getAuth() {
    return this.isAuth
  }
}
