import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CookieEncryptionService {
  constructor() {}
  
  encryptCookie(data: string): string {
    return CryptoJS.AES.encrypt(data, environment.key).toString()
  }

  decryptCookie() {}
}
