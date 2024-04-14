import { Injectable, inject } from '@angular/core'
import { DatabaseService } from './database.service'
import { UserEncryptedFile } from '../../models/user-encrypted-files.model'
import { EncryptedItem } from '../../models/encrypted-item.model'

@Injectable({
  providedIn: 'root',
})
export class UserEncryptedFileDalService {
  private lbedb: DatabaseService = inject(DatabaseService)


  async createUserEncryptFile(userEncryptedFile: UserEncryptedFile): Promise<void> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }

    const TRAN: IDBTransaction = db.transaction(['user_encrypted_files'], 'readwrite')
    const USER_GALLERY_STORE: IDBObjectStore = TRAN.objectStore('user_encrypted_files')

    await new Promise<void>((resolve, reject) => {
      const REQ: IDBRequest<IDBValidKey> = USER_GALLERY_STORE.put(userEncryptedFile)
      REQ.onsuccess = () => resolve()
      REQ.onerror = () => reject(REQ.error)
    })
  }

  async insertEncryptedFile(userName: string, encryptedItem: EncryptedItem): Promise<void> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }

    const TRAN: IDBTransaction = db.transaction(['user_encrypted_files'], 'readwrite')
    const USER_GALLERY_STORE: IDBObjectStore = TRAN.objectStore('user_encrypted_files')

    await new Promise<void>((resolve, reject) => {
      const REQ: IDBRequest = USER_GALLERY_STORE.get(userName)
      REQ.onsuccess = () => {
        const user: UserEncryptedFile = REQ.result as UserEncryptedFile
        if (user) {
          user.encryptedFiles[encryptedItem.id] = encryptedItem
          const updateRequest: IDBRequest<IDBValidKey> = USER_GALLERY_STORE.put(user)
          updateRequest.onsuccess = () => resolve()
          updateRequest.onerror = () => reject(updateRequest.error)
        } else {
          reject(new Error('User not found'))
        }
      }
      REQ.onerror = () => reject(REQ.error)
    })
  }

  async deleteEncryptedFile(userName: string, id: string): Promise<void> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }

    const TRAN: IDBTransaction = db.transaction(['user_encrypted_files'], 'readwrite')
    const USER_GALLERY_STORE: IDBObjectStore = TRAN.objectStore('user_encrypted_files')

    await new Promise<void>((resolve, reject) => {
      const REQ: IDBRequest = USER_GALLERY_STORE.get(userName)
      REQ.onsuccess = () => {
        const user: UserEncryptedFile = REQ.result as UserEncryptedFile
        if (user) {
          delete user.encryptedFiles[id]
          const updateRequest: IDBRequest<IDBValidKey> = USER_GALLERY_STORE.put(user)
          updateRequest.onsuccess = () => resolve()
          updateRequest.onerror = () => reject(updateRequest.error)
        } else {
          reject(new Error('User not found'))
        }
      }
      REQ.onerror = () => reject(REQ.error)
    })
  }
}
