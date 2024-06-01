import { Injectable, inject } from '@angular/core'
import { DatabaseService } from './database.service'
import { User } from '../../models/user.model'
import { UserGalleryDalService } from './user-gallery.dal.service'
import { UserGallery } from '../../models/user-gallery.model'
import { UserEncryptedFileDalService } from './user-encrypted-file.dal.service'
import { UserEncryptedItems } from '../../models/user-encrypted-items.model'

@Injectable({
  providedIn: 'root',
})
export class UserDalService {
  private ugDalService: UserGalleryDalService = inject(UserGalleryDalService)
  private uefDalService: UserEncryptedFileDalService = inject(
    UserEncryptedFileDalService
  )
  private lbedb: DatabaseService = inject(DatabaseService)

  async insert(user: User): Promise<any> {
    try {
      const TRAN: IDBTransaction = this.lbedb.db!.transaction(
        ['users'],
        'readwrite'
      )
      const USER_STORE: IDBObjectStore = TRAN.objectStore('users')
      // Create a promise around the IDBRequest to await it
      await new Promise<void>((resolve, reject) => {
        const request: IDBRequest<IDBValidKey> = USER_STORE.add(user)
        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })
      await this.ugDalService.createUserGallery(new UserGallery(user.userName))
      await this.uefDalService.createUserEncryptFile(
        new UserEncryptedItems(user.userName)
      )
    } catch (error) {
      console.error(error)
    }
  }

  delete(user: User): Promise<void> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) throw new Error('Database has not been initialized.')
    const TRAN: IDBTransaction = db.transaction(['users'], 'readwrite')
    const USER_STORE: IDBObjectStore = TRAN.objectStore('users')

    return new Promise((resolve, reject) => {
      const REQ_DELETE = USER_STORE.delete(user.userName)
      REQ_DELETE.onsuccess = (event: any) => {
        resolve(event)
      }
      REQ_DELETE.onerror = (event: any) => {
        reject(event)
      }
    })
  }

  update(user: User): Promise<void> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) throw new Error('Database has not been initialized.')
    const TRAN: IDBTransaction = db.transaction(['users'], 'readwrite')
    const USER_STORE: IDBObjectStore = TRAN.objectStore('users')
    return new Promise((resolve, reject) => {
      const REQ_GET = USER_STORE.get(user.userName)

      REQ_GET.onsuccess = (event: any) => {
        const USER = event.target.result as User
        if (USER) {
          USER.password = user.password
          USER_STORE.put(USER)
        }
        resolve(event)
      }
      REQ_GET.onerror = (event: any) => {
        reject(event)
      }
    })
  }

  find(userName: string): Promise<any> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) throw new Error('Database has not been initialized.')

    const TRAN: IDBTransaction = db.transaction(['users'], 'readwrite')
    const USER_STORE: IDBObjectStore = TRAN.objectStore('users')
    return new Promise((resolve, reject) => {
      const REQ = USER_STORE.get(userName)
      REQ.onsuccess = (event: any) => {
        event.target.result ? resolve(event.target.result) : resolve(null)
      }
      REQ.onerror = (event: any) => {
        reject(event)
        console.error('Something went wrong finding user')
      }
    })
  }

  public comparePassword(userName: string, password: string): Promise<any> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) throw new Error('Database has not been initialized.')
    const TRAN: IDBTransaction = db.transaction(['users'], 'readwrite')
    const USER_STORE: IDBObjectStore = TRAN.objectStore('users')
    return new Promise((resolve, reject) => {
      const REQ = USER_STORE.get(userName)
      REQ.onsuccess = (event: any) => {
        if (event.target.result.password === password) resolve(true)
        else resolve(false)
      }
      REQ.onerror = (event: any) => {
        reject(event)
      }
    }).catch((err) => console.log(err))
  }
}
