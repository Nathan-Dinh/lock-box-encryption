import { Injectable, inject } from '@angular/core'
import { CookieEncryptionService } from '../services/crypto/cookie-encryption.service'
import { CookieService } from 'ngx-cookie-service'
import { UserInfoService } from './user-info-store.service'
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root',
})
export class AuthControlService {
  ceService = inject(CookieEncryptionService)
  cService = inject(CookieService)
  uiService = inject(UserInfoService)

  isAuth = false
  constructor() {
    const COOKIE: string = this.cService.get('session') as string
    if (COOKIE !== '') {
      const DECRYPT_COOKIE: string = this.ceService.decryptCookie(
        COOKIE
      ) as string
      const USER_INFO: string[] = DECRYPT_COOKIE.split('-') as string[]
      this.uiService.setUser(new User(USER_INFO[0], USER_INFO[1]))
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
