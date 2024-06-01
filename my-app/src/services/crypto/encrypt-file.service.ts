import { Injectable,inject } from '@angular/core';
import { environment } from '../../environments/environment'
import { CookieService } from 'ngx-cookie-service'
import * as CryptoJS from 'crypto-js'

@Injectable({
  providedIn: 'root',
})
export class EncryptFileService {
  private cService = inject(CookieService)

  public encryptItem(imgData: string): string {
    this.cService.delete('session')
    const C_BODY: string = imgData
    return CryptoJS.AES.encrypt(C_BODY, environment.key).toString()
  }

  public decryptItem(cBody: string): string {
    const BYTES = CryptoJS.AES.decrypt(cBody, environment.key)
    return BYTES.toString(CryptoJS.enc.Utf8)
  }
}
