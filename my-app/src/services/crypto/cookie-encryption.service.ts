import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CookieEncryptionService {
  
  encryptCookie(cBody: string): string {
    return CryptoJS.AES.encrypt(cBody, environment.key).toString()
  }

  decryptCookie(cBody: string) {
    const bytes = CryptoJS.AES.decrypt(cBody, environment.key)
    return bytes.toString(CryptoJS.enc.Utf8)
  }
}
