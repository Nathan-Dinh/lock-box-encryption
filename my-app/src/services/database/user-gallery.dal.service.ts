import { Injectable, inject } from '@angular/core'
import { PictureItem } from '../../models/picture-item.model'
import { DatabaseService } from './database.service'
import { User } from '../../models/user.model'

@Injectable({
  providedIn: 'root',
})
export class UserGalleryDalService {
  private lbedb = inject(DatabaseService)

  insertGallery(userName: string, item: PictureItem) {
    return new Promise((resolve, reject) => {
      const TRAN = this.lbedb.db.transaction(['users'], 'readwrite')
      const USER_STORE = TRAN.objectStore('users')
      const REQ = USER_STORE.get(userName)
      REQ.onsuccess = (event: any) => {
        const USER = event.target.result as User
        if (USER) {
          USER.userGallery[item.getId()] = item
          USER_STORE.put(USER)
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
      const TRAN = this.lbedb.db.transaction(['users'], 'readwrite')
      const USER_STORE = TRAN.objectStore('users')
      const REQ = USER_STORE.get(userName)
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
      const TRAN = this.lbedb.db.transaction(['users'], 'readwrite')
      const USER_STORE = TRAN.objectStore('users')
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
      const TRAN = this.lbedb.db.transaction(['users'], 'readwrite')
      const USER_STORE = TRAN.objectStore('users')
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
