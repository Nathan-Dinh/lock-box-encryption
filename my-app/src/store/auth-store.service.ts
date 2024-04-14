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
  private ceService: UserCookieEncryptionService = inject(UserCookieEncryptionService)
  private cService: CookieService = inject(CookieService)
  private uiService: UserInfoService = inject(UserInfoService)
  private uDalService: UserDalService = inject(UserDalService)

  private isAuth: boolean = false

  constructor() {
    const COOKIE: string = this.cService.get('session') as string
    if (COOKIE !== '') {
      const DECRYPT_COOKIE: string = this.ceService.decryptCookie(
        COOKIE,
      ) as string
      const USER_INFO: string[] = DECRYPT_COOKIE.split('-') as string[]
      this.uiService.setUser(new User(USER_INFO[0], USER_INFO[1]))
      this.isAuth = true
    }
  }

  async authorizedUser(user: User): Promise<boolean> {
    const data = await this.uDalService.find(user.userName)
    if (data !== null && data.password === user.password) {
      return true
    } else {
      return false
    }
  }

  setAuth(isAuth: boolean): void {
    this.isAuth = isAuth
  }

  getAuth(): boolean {
    return this.isAuth
  }
}
