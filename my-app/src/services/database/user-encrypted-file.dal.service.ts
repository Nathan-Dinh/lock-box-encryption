import { Injectable, inject } from '@angular/core'
import { DatabaseService } from './database.service'
import { UserEncryptedItems } from '../../models/user-encrypted-items.model'
import { EncryptedItem } from '../../models/encrypted-item.model'

@Injectable({
  providedIn: 'root',
})
export class UserEncryptedFileDalService {
  private lbedb = inject(DatabaseService)

  findEncryptedItem(userName: string, id: string) {
    return new Promise((resolve, reject) => {
      const TRAN = this.lbedb.db.transaction(
        ['user_encrypted_files'],
        'readwrite'
      )
      const USER_GALLERY_STORE = TRAN.objectStore('user_encrypted_files')
      const REQ = USER_GALLERY_STORE.get(userName)
      REQ.onsuccess = (event: any) => {
        const USER = event.target.result as UserEncryptedItems
        if (USER) {
          resolve(USER.encryptedFiles[id])
        } else {
          reject(event)
        }
      }
      REQ.onerror = (event: any) => {
        reject(event)
      }
    })
  }

  deleteUserEncryptedFiles(userName: string){
    return new Promise((resolve, reject) => {
      const TRAN = this.lbedb.db.transaction(['user_encrypted_files'], 'readwrite')
      const USER_GALLERY_STORE = TRAN.objectStore('user_encrypted_files')
      const REQ = USER_GALLERY_STORE.delete(userName)
      REQ.onsuccess = (event: any) => resolve(event)
      REQ.onerror = (event: any) => reject(event)
    });
  }

  createUserEncryptFile(userEncryptedFile: UserEncryptedItems) {
    return new Promise((resolve, reject) => {
      const TRAN = this.lbedb.db.transaction(
        ['user_encrypted_files'],
        'readwrite'
      )
      const USER_GALLERY_STORE = TRAN.objectStore('user_encrypted_files')
      const REQ = USER_GALLERY_STORE.put(userEncryptedFile)
      REQ.onsuccess = (event: any) => resolve(event)
      REQ.onerror = (event: any) => reject(event)
    })
  }

  insertEncryptedFile(userName: string, encryptedItem: EncryptedItem) {
    return new Promise((resolve, reject) => {
      const TRAN = this.lbedb.db.transaction(
        ['user_encrypted_files'],
        'readwrite'
      )
      const USER_GALLERY_STORE = TRAN.objectStore('user_encrypted_files')
      const REQ = USER_GALLERY_STORE.get(userName)
      REQ.onsuccess = (event: any) => {
        const USER = event.target.result as UserEncryptedItems
        if (USER) {
          USER.encryptedFiles[encryptedItem.id] = encryptedItem
          USER_GALLERY_STORE.put(USER)
          resolve(event)
        } else {
          reject(event)
        }
      }
      REQ.onerror = (event: any) => {
        reject(event)
      }
    })
  }

  deleteEncryptedFile(userName: string, id: string) {
    return new Promise((resolve, reject) => {
      const TRAN = this.lbedb.db.transaction(
        ['user_encrypted_files'],
        'readwrite'
      )
      const USER_GALLERY_STORE = TRAN.objectStore('user_encrypted_files')
      const REQ = USER_GALLERY_STORE.get(userName)
      REQ.onsuccess = (event: any) => {
        const USER = event.target.result as UserEncryptedItems
        if (USER) {
          delete USER.encryptedFiles[id]
          USER_GALLERY_STORE.put(USER)
          resolve(event)
        } else {
          reject(event)
        }
      }
      REQ.onerror = (event: any) => {
        reject(event)
      }
    })
  }
}
