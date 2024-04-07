import { Injectable, inject } from '@angular/core'
import { UserCookieEncryptionService } from '../services/crypto/user-cookie-encryption.service'
import { CookieService } from 'ngx-cookie-service'
import { UserInfoService } from './user-info-store.service'
import { UserDalService } from '../services/database/user.dal.service'
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root',
})
export class AuthControlService {
  private ceService = inject(UserCookieEncryptionService)
  private cService = inject(CookieService)
  private uiService = inject(UserInfoService)
  private uDalService = inject(UserDalService)

  private isAuth = false

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

  authorizedUser(user: User): Promise<boolean> {
    return this.uDalService.findUser(user.userName).then((data) => {
      if (data !== null && data.password === user.password) {
        return true
      } else {
        return false
      }
    })
  }

  setAuth(isAuth: boolean) {
    this.isAuth = isAuth
  }

  getAuth() {
    return this.isAuth
  }
}
