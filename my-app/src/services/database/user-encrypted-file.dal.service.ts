import { Injectable, inject } from '@angular/core'
import { DatabaseService } from './database.service'
import { UserEncryptedItems } from '../../models/user-encrypted-items.model'
import { EncryptedItem } from '../../models/encrypted-item.model'

@Injectable({
  providedIn: 'root',
})
export class UserEncryptedFileDalService {
  private lbedb: DatabaseService = inject(DatabaseService)

  findEncryptedItem(userName: string, id: string): Promise<any> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }
    const TRAN: IDBTransaction = db.transaction(
      ['user_encrypted_files'],
      'readwrite'
    )
    const USER_GALLERY_STORE: IDBObjectStore = TRAN.objectStore(
      'user_encrypted_files'
    )
    return new Promise((resolve, reject) => {
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

  deleteUserEncryptedFiles(userName: string): Promise<void> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }
    const TRAN: IDBTransaction = db.transaction(
      ['user_encrypted_files'],
      'readwrite'
    )
    const USER_GALLERY_STORE: IDBObjectStore = TRAN.objectStore(
      'user_encrypted_files'
    )
    return new Promise((resolve, reject) => {
      const REQ = USER_GALLERY_STORE.delete(userName)
      REQ.onsuccess = (event: any) => resolve(event)
      REQ.onerror = (event: any) => reject(event)
    })
  }

  async createUserEncryptFile(
    userEncryptedFile: UserEncryptedItems
  ): Promise<void> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }
    const TRAN: IDBTransaction = db.transaction(
      ['user_encrypted_files'],
      'readwrite'
    )
    const USER_GALLERY_STORE: IDBObjectStore = TRAN.objectStore(
      'user_encrypted_files'
    )

    await new Promise<void>((resolve, reject) => {
      const REQ: IDBRequest<IDBValidKey> =
        USER_GALLERY_STORE.put(userEncryptedFile)
      REQ.onsuccess = () => resolve()
      REQ.onerror = () => reject(REQ.error)
    })
  }

  async insertEncryptedFile(
    userName: string,
    encryptedItem: EncryptedItem
  ): Promise<void> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }
    const TRAN: IDBTransaction = db.transaction(
      ['user_encrypted_files'],
      'readwrite'
    )
    const USER_GALLERY_STORE: IDBObjectStore = TRAN.objectStore(
      'user_encrypted_files'
    )

    await new Promise<void>((resolve, reject) => {
      const REQ: IDBRequest = USER_GALLERY_STORE.get(userName)
      REQ.onsuccess = () => {
        const USER: UserEncryptedItems = REQ.result as UserEncryptedItems
        if (USER) {
          USER.encryptedFiles[encryptedItem.id] = encryptedItem
          const UPDATE_REQUEST: IDBRequest<IDBValidKey> =
            USER_GALLERY_STORE.put(USER)
          UPDATE_REQUEST.onsuccess = () => resolve()
          UPDATE_REQUEST.onerror = () => reject(UPDATE_REQUEST.error)
          USER_GALLERY_STORE.put(USER)
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
    const TRAN: IDBTransaction = db.transaction(
      ['user_encrypted_files'],
      'readwrite'
    )
    const USER_GALLERY_STORE: IDBObjectStore = TRAN.objectStore(
      'user_encrypted_files'
    )
    await new Promise<void>((resolve, reject) => {
      const REQ: IDBRequest = USER_GALLERY_STORE.get(userName)
      REQ.onsuccess = (event: any) => {
        const USER = event.target.result as UserEncryptedItems
        if (USER) {
          delete USER.encryptedFiles[id]
          const UPDATE_REQUEST: IDBRequest<IDBValidKey> =
            USER_GALLERY_STORE.put(USER)
          UPDATE_REQUEST.onsuccess = () => resolve()
          UPDATE_REQUEST.onerror = () => reject(UPDATE_REQUEST.error)
        } else {
          reject(new Error('User not found'))
        }
      }
      REQ.onerror = () => reject(REQ.error)
    })
  }
}
