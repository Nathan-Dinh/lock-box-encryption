import { Injectable, inject } from '@angular/core'
import { DatabaseService } from './database.service'
import { User } from '../../models/user.model'
import { UserGalleryDalService } from './user-gallery.dal.service'
import { UserGallery } from '../../models/user-gallery.model'
import { UserEncryptedFileDalService } from './user-encrypted-file.dal.service'
import { UserEncryptedFile } from '../../models/user-encrypted-files.model'

@Injectable({
  providedIn: 'root',
})
export class UserDalService {
  private ugDalService: UserGalleryDalService = inject(UserGalleryDalService)
  private uefDalService: UserEncryptedFileDalService = inject(UserEncryptedFileDalService)
  private lbedb: DatabaseService = inject(DatabaseService)

  async insert(user: User): Promise<void> {
    try {
      const TRAN: IDBTransaction = this.lbedb.db!.transaction(['users'], 'readwrite')
      const USER_STORE: IDBObjectStore = TRAN.objectStore('users')
      // Create a promise around the IDBRequest to await it
      await new Promise<void>((resolve, reject) => {
        const request: IDBRequest<IDBValidKey> = USER_STORE.add(user)
        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })
      await this.ugDalService.createUserGallery(new UserGallery(user.userName))
      await this.uefDalService.createUserEncryptFile(new UserEncryptedFile(user.userName))
    } catch (error) {
      console.error(error)
    }
  }

  async delete(user: User): Promise<void> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }

    const TRAN: IDBTransaction = db.transaction(['users'], 'readwrite')
    const USER_STORE: IDBObjectStore = TRAN.objectStore('users')

    await new Promise<void>((resolve, reject) => {
      const REQ_DELETE: IDBRequest<undefined> = USER_STORE.delete(user.userName)
      REQ_DELETE.onsuccess = () => resolve()
      REQ_DELETE.onerror = () => reject(REQ_DELETE.error)
    })
  }

  async update(user: User): Promise<void> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }

    const TRAN: IDBTransaction = db.transaction(['users'], 'readwrite')
    const USER_STORE: IDBObjectStore = TRAN.objectStore('users')

    await new Promise<void>((resolve, reject) => {
      const REQ_GET: IDBRequest = USER_STORE.get(user.userName)
      REQ_GET.onsuccess = () => {
        const existingUser: User = REQ_GET.result as User
        if (existingUser) {
          existingUser.password = user.password
          const updateRequest: IDBRequest<IDBValidKey> = USER_STORE.put(existingUser)
          updateRequest.onsuccess = () => resolve()
          updateRequest.onerror = () => reject(updateRequest.error)
        } else {
          reject(new Error('User not found'))
        }
      }
      REQ_GET.onerror = () => reject(REQ_GET.error)
    })
  }

  async find(userName: string): Promise<User | null> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }

    const TRAN: IDBTransaction = db.transaction(['users'], 'readwrite')
    const USER_STORE: IDBObjectStore = TRAN.objectStore('users')

    return new Promise<User | null>((resolve, reject) => {
      const REQ: IDBRequest = USER_STORE.get(userName)
      REQ.onsuccess = () => {
        if (REQ.result === undefined) {
          resolve(null);
        } else {
          resolve(REQ.result as User);
        }
      };
      REQ.onerror = () => {
        reject(REQ.error)
        console.error('Something went wrong finding user', REQ.error)
      }
    })
  }
}
