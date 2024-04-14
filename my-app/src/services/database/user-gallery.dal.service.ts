import { Injectable, inject } from '@angular/core'
import { PictureItem } from '../../models/picture-item.model'
import { DatabaseService } from './database.service'
import { UserGallery } from '../../models/user-gallery.model'

@Injectable({
  providedIn: 'root',
})
export class UserGalleryDalService {
  private lbedb: DatabaseService = inject(DatabaseService)

  async createUserGallery(userGallery: UserGallery): Promise<void> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }

    const TRAN: IDBTransaction = db.transaction(['user_gallery'], 'readwrite')
    const USER_GALLERY_STORE: IDBObjectStore = TRAN.objectStore('user_gallery')

    await new Promise<void>((resolve, reject) => {
      const request: IDBRequest<IDBValidKey> = USER_GALLERY_STORE.put(userGallery)
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  async findGallery(userName: string): Promise<UserGallery | null> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }

    const TRAN: IDBTransaction = db.transaction(['user_gallery'], 'readwrite')
    const USER_GALLERY_STORE: IDBObjectStore = TRAN.objectStore('user_gallery')

    return new Promise<UserGallery | null>((resolve, reject) => {
      const REQ: IDBRequest = USER_GALLERY_STORE.get(userName)
      REQ.onsuccess = () => resolve(REQ.result as UserGallery | null)
      REQ.onerror = () => reject(REQ.error)
    })
  }

  async insertGallery(userName: string, item: PictureItem): Promise<void> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      alert('Database has not been initialized.')
      throw new Error('Database has not been initialized.')
    }

    const TRAN: IDBTransaction = db.transaction(['user_gallery'], 'readwrite')
    const USER_GALLERY_STORE: IDBObjectStore = TRAN.objectStore('user_gallery')

    await new Promise<void>((resolve, reject) => {
      const request: IDBRequest = USER_GALLERY_STORE.get(userName)
      request.onsuccess = () => {
        const user: UserGallery = request.result as UserGallery
        if (user) {
          user.userGallery[item.getId()] = item
          const updateRequest: IDBRequest<IDBValidKey> = USER_GALLERY_STORE.put(user)
          updateRequest.onsuccess = () => resolve()
          updateRequest.onerror = () => reject(updateRequest.error)
        } else {
          reject(new Error('User not found'))
        }
      }
      request.onerror = () => reject(request.error)
    })
  }

  async findGalleryItem(id: string, userName: string): Promise<PictureItem | null> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }

    const TRAN: IDBTransaction = db.transaction(['user_gallery'], 'readwrite')
    const USER_GALLERY_STORE: IDBObjectStore = TRAN.objectStore('user_gallery')

    return new Promise<PictureItem | null>((resolve, reject) => {
      const REQ: IDBRequest = USER_GALLERY_STORE.get(userName)
      REQ.onsuccess = () => {
        const userGallery: UserGallery = REQ.result as UserGallery
        if (userGallery && userGallery.userGallery[id]) {
          resolve(userGallery.userGallery[id])
        } else {
          resolve(null)
        }
      }
      REQ.onerror = () => {
        reject(REQ.error)
      }
    })
  }

  async deleteGalleryItem(id: string, userName: string): Promise<void> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }

    const TRAN: IDBTransaction = db.transaction(['user_gallery'], 'readwrite')
    const USER_STORE: IDBObjectStore = TRAN.objectStore('user_gallery')

    await new Promise<void>((resolve, reject) => {
      const REQ: IDBRequest = USER_STORE.get(userName)
      REQ.onsuccess = () => {
        const user: UserGallery = REQ.result as UserGallery
        if (user && user.userGallery[id]) {
          delete user.userGallery[id]
          const updateRequest: IDBRequest<IDBValidKey> = USER_STORE.put(user)
          updateRequest.onsuccess = () => resolve()
          updateRequest.onerror = () => reject(updateRequest.error)
        } else {
          reject(new Error('User or item not found'))
        }
      }
      REQ.onerror = () => reject(REQ.error)
    })
  }

  async editGalleryItem(pictureItem: PictureItem, userName: string): Promise<void> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }

    const TRAN: IDBTransaction = db.transaction(['user_gallery'], 'readwrite')
    const USER_STORE: IDBObjectStore = TRAN.objectStore('user_gallery')

    await new Promise<void>((resolve, reject) => {
      const REQ = USER_STORE.get(userName)
      REQ.onsuccess = () => {
        const user = REQ.result as UserGallery
        if (user) {
          user.userGallery[pictureItem.getId()] = pictureItem
          const updateRequest = USER_STORE.put(user)
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
