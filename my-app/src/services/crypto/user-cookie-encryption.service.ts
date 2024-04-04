import { Injectable, inject } from '@angular/core'
import { environment } from '../../environments/environment'
import { CookieService } from 'ngx-cookie-service'
import * as CryptoJS from 'crypto-js'
import { User } from '../../models/user.model'

@Injectable({
  providedIn: 'root',
})
export class UserCookieEncryptionService {
   private cService = inject(CookieService)


  setUserCookie(user : User){
    const C_BODY: string = user.userName + '-' + user.password
    const C_Name: string = 'session'
    this.cService.set(C_Name, this.encryptCookie(C_BODY))
  }

  deleteUserCookie(){
    this.cService.delete("session")
  }
  
  encryptCookie(cBody: string): string {
    return CryptoJS.AES.encrypt(cBody, environment.key).toString()
  }

  decryptCookie(cBody: string) {
    const bytes = CryptoJS.AES.decrypt(cBody, environment.key)
    return bytes.toString(CryptoJS.enc.Utf8)
  }
}
