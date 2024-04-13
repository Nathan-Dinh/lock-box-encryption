import { Injectable, inject } from '@angular/core'
import { PictureItem } from '../../models/picture-item.model'
import { DatabaseService } from './database.service'
import { User } from '../../models/user.model'
import { UserGallery } from '../../models/user-gallery.model'
import { transition } from '@angular/animations'

@Injectable({
  providedIn: 'root',
})
export class UserGalleryDalService {
  private lbedb = inject(DatabaseService)

  createUserGallery(userGallery: UserGallery) {
    return new Promise((resolve, reject) => {
      const TRAN = this.lbedb.db.transaction(['user_gallery'], 'readwrite')
      const USER_GALLERY_STORE = TRAN.objectStore('user_gallery')
      const REQ = USER_GALLERY_STORE.put(userGallery)
      REQ.onsuccess = (event: any) => resolve(event)
      REQ.onerror = (event: any) => reject(event) 
    })
  }

  findGallery(userName: string): Promise<any>{
    return new Promise((resolve, reject) => {
      const TRAN = this.lbedb.db.transaction(['user_gallery'], 'readwrite')
      const USER_GALLERY_STORE = TRAN.objectStore('user_gallery')
      const REQ = USER_GALLERY_STORE.get(userName)
      REQ.onsuccess = (event: any) => resolve(event.target.result)
      REQ.onerror = (event: any) => reject(event)
    });
  }

  insertGallery(userName: string, item: PictureItem) {
    return new Promise((resolve, reject) => {
      const TRAN = this.lbedb.db.transaction(['user_gallery'], 'readwrite')
      const USER_GALLERY_STORE = TRAN.objectStore('user_gallery')
      const REQ = USER_GALLERY_STORE.get(userName)
      REQ.onsuccess = (event: any) => {
        const USER = event.target.result as User
        if (USER) {
          USER.userGallery[item.getId()] = item
          USER_GALLERY_STORE.put(USER)
        }
        resolve(event)
      }
      REQ.onerror = (event: any) => {
        reject(event)
      }
    })
  }

  findGalleryItem(id: string, userName: string) {
    return new Promise((resolve, reject) => {
      const TRAN = this.lbedb.db.transaction(['user_gallery'], 'readwrite')
      const USER_GALLERY_STORE = TRAN.objectStore('user_gallery')
      const REQ = USER_GALLERY_STORE.get(userName)
      REQ.onsuccess = (event: any) => {
        const USER = event.target.result as User
        if (USER) {
          resolve(USER.userGallery[id])
        }
      }
      REQ.onerror = (event: any) => {
        reject(event)
      }
    })
  }

  deleteGalleryItem(id: string, userName: string) {
    return new Promise((resolve, reject) => {
      const TRAN = this.lbedb.db.transaction(['user_gallery'], 'readwrite')
      const USER_STORE = TRAN.objectStore('user_gallery')
      const REQ = USER_STORE.get(userName)
      REQ.onsuccess = (event: any) => {
        const USER = event.target.result as User
        if (USER) {
          delete USER.userGallery[id]
          USER_STORE.put(USER)
          resolve(event)
        }
      }
      REQ.onerror = (event: any) => {
        reject(event)
      }
    })
  }

  editGalleryItem(pictureItem: PictureItem, userName: string) {
    return new Promise((resolve, reject) => {
      const TRAN = this.lbedb.db.transaction(['user_gallery'], 'readwrite')
      const USER_STORE = TRAN.objectStore('user_gallery')
      const REQ = USER_STORE.get(userName)
      REQ.onsuccess = (event: any) => {
        const USER = event.target.result as User
        if (USER) {
          console.log(pictureItem)
          USER.userGallery[pictureItem.getId()] = pictureItem
          USER_STORE.put(USER)
          resolve(event)
        }
      }
      REQ.onerror = (event: any) => {
        reject(event)
      }
    })
  }
}
