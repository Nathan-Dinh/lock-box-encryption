import { Injectable, inject } from '@angular/core'
import { PictureItem } from '../../models/picture-item.model'
import { DatabaseService } from './database.service'
import { User } from '../../models/user.model'
import { UserGallery } from '../../models/user-gallery.model'

@Injectable({
  providedIn: 'root',
})
export class UserGalleryDalService {
  private lbedb: DatabaseService = inject(DatabaseService)

  createUserGallery(userGallery: UserGallery): Promise<void> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }

    const TRAN: IDBTransaction = db.transaction(['user_gallery'], 'readwrite')
    const USER_GALLERY_STORE: IDBObjectStore = TRAN.objectStore('user_gallery')

    return new Promise((resolve, reject) => {
      const REQ = USER_GALLERY_STORE.put(userGallery)
      REQ.onsuccess = (event: any) => resolve(event)
      REQ.onerror = (event: any) => reject(event)
    })
  }

  deleteUserGallery(userName: string): Promise<void> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }

    const TRAN: IDBTransaction = db.transaction(['user_gallery'], 'readwrite')
    const USER_GALLERY_STORE: IDBObjectStore = TRAN.objectStore('user_gallery')

    return new Promise((resolve, reject) => {
      const REQ = USER_GALLERY_STORE.delete(userName)
      REQ.onsuccess = (event: any) => resolve(event)
      REQ.onerror = (event: any) => reject(event)
    })
  }

  findGallery(userName: string): Promise<any> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }

    const TRAN: IDBTransaction = db.transaction(['user_gallery'], 'readwrite')
    const USER_GALLERY_STORE: IDBObjectStore = TRAN.objectStore('user_gallery')

    return new Promise((resolve, reject) => {
      const REQ = USER_GALLERY_STORE.get(userName)
      REQ.onsuccess = (event: any) => resolve(event.target.result)
      REQ.onerror = (event: any) => reject(event)
    })
  }

  insertGallery(userName: string, item: PictureItem): Promise<void> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }
    const TRAN: IDBTransaction = db.transaction(['user_gallery'], 'readwrite')
    const USER_GALLERY_STORE: IDBObjectStore = TRAN.objectStore('user_gallery')
    return new Promise((resolve, reject) => {
      const REQ = USER_GALLERY_STORE.get(userName)
      REQ.onsuccess = (event: any) => {
        const USER = event.target.result as UserGallery
        if (USER) {
          USER.userGallery[item.id] = item
          USER_GALLERY_STORE.put(USER)
        }
        resolve(event)
      }
      REQ.onerror = (event: any) => {
        reject(event)
      }
    })
  }

  findGalleryItem(id: string, userName: string): Promise<any> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }

    const TRAN: IDBTransaction = db.transaction(['user_gallery'], 'readwrite')
    const USER_GALLERY_STORE: IDBObjectStore = TRAN.objectStore('user_gallery')

    return new Promise((resolve, reject) => {
      const REQ = USER_GALLERY_STORE.get(userName)
      REQ.onsuccess = (event: any) => {
        const USER = event.target.result as UserGallery
        if (USER) {
          resolve(USER.userGallery[id])
        }
      }
      REQ.onerror = (event: any) => {
        reject(event)
      }
    })
  }

  deleteGalleryItem(id: string, userName: string): Promise<void> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }

    const TRAN: IDBTransaction = db.transaction(['user_gallery'], 'readwrite')
    const USER_GALLERY_STORE: IDBObjectStore = TRAN.objectStore('user_gallery')
    return new Promise((resolve, reject) => {
      const REQ = USER_GALLERY_STORE.get(userName)
      REQ.onsuccess = (event: any) => {
        const USER = event.target.result as UserGallery
        if (USER) {
          delete USER.userGallery[id]
          USER_GALLERY_STORE.put(USER)
          resolve(event)
        }
      }
      REQ.onerror = (event: any) => {
        reject(event)
      }
    })
  }

  editGalleryItem(pictureItem: PictureItem, userName: string): Promise<void> {
    const db: IDBDatabase | null = this.lbedb.db
    if (!db) {
      throw new Error('Database has not been initialized.')
    }
    const TRAN: IDBTransaction = db.transaction(['user_gallery'], 'readwrite')
    const USER_GALLERY_STORE: IDBObjectStore = TRAN.objectStore('user_gallery')
    return new Promise((resolve, reject) => {
      const REQ = USER_GALLERY_STORE.get(userName)
      REQ.onsuccess = (event: any) => {
        const USER = event.target.result as UserGallery
        if (USER) {
          console.log(pictureItem)
          USER.userGallery[pictureItem.id] = pictureItem
          USER_GALLERY_STORE.put(USER)
          resolve(event)
        }
      }
      REQ.onerror = (event: any) => {
        reject(event)
      }
    })
  }
}
