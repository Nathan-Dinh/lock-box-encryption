import { Injectable,inject } from '@angular/core';
import { environment } from '../../environments/environment'
import { CookieService } from 'ngx-cookie-service'
import * as CryptoJS from 'crypto-js'
import { EncryptedItem } from '../../models/encrypted-item.model';

@Injectable({
  providedIn: 'root'
})
export class EncryptFileService {
  private cService = inject(CookieService)

  encryptItem(imgData : string){
    this.cService.delete("session")
    const C_BODY: string = imgData
    return CryptoJS.AES.encrypt(C_BODY, environment.key).toString()
  }

  decryptCookie(cBody: string) {
    const bytes = CryptoJS.AES.decrypt(cBody, environment.key)
    return bytes.toString(CryptoJS.enc.Utf8)
  }
}
