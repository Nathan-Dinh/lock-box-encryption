import { Injectable, inject } from '@angular/core'
import { Router } from '@angular/router'
import { UserCookieEncryptionService } from '../crypto/user-cookie-encryption.service'
import { User } from '../../models/user.model'
import { AuthControlService } from '../../store/auth-store.service'
import { UserInfoService } from '../../store/user-info-store.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private uceService = inject(UserCookieEncryptionService)
  private route = inject(Router)
  private ceService = inject(UserCookieEncryptionService)
  private uiService = inject(UserInfoService)
  private authControl = inject(AuthControlService)

  public signout(): void {
    this.uceService.deleteUserCookie()
    this.route.navigate(['login'])
  }

  public async login(userName: string, password: string): Promise<boolean> {
    const USER: User = new User(userName, password)
    if (await this.authControl.authorizedUser(USER)) {
      this.uiService.setUser(USER)
      this.authControl.setAuth(true)
      this.ceService.setUserCookie(USER)
      this.route.navigate(['/home'])
      return true
    } else return false
  }
}
