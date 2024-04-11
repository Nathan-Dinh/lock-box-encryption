import { Injectable, inject } from '@angular/core'
import { PictureItem } from '../../models/picture-item.model'
import { DatabaseService } from './database.service'
import { User } from '../../models/user.model'

@Injectable({
  providedIn: 'root',
})
export class UserGalleryDalService {
  private lbedb = inject(DatabaseService)

  insertGallery(user: string, item: PictureItem) {
    return new Promise((resolve, reject) => {
      const TRAN = this.lbedb.db.transaction(['users'], 'readwrite')
      const USER_STORE = TRAN.objectStore('users')
      console.log(user)
      const REQ = USER_STORE.get('dsa')
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

  // async retrieveGalleries(): Promise<PictureItem[]> {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       const transaction = this.lbedb.db.transaction(
  //         ['users'],
  //         'readonly'
  //       )
  //       const galleryStore = transaction.objectStore('users')
  //       const request = galleryStore.openCursor()
  //       const galleries: PictureItem[] = []

  //       request.onsuccess = (event: any) => {
  //         const cursor = event.target.result
  //         if (cursor) {
  //           galleries.push(cursor.value)
  //           cursor.continue()
  //         } else {
  //           resolve(galleries)
  //         }
  //       }
  //       request.onerror = (event: any) => {
  //         reject('Error in retrieving galleries')
  //       }
  //     } catch (e) {
  //       reject(e)
  //     }
  //   })
  // }

  // deleteGallery(galleryId: number): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const transaction = this.lbedb.db.transaction(
  //       ['user_gallery'],
  //       'readwrite'
  //     )
  //     const galleryStore = transaction.objectStore('user_gallery')
  //     const request = galleryStore.delete(galleryId)

  //     request.onsuccess = (event: any) => {
  //       resolve(event)
  //     }
  //     request.onerror = (event: any) => {
  //       reject(event)
  //     }
  //   })
  // }

  // updateGallery(galleryItem: PictureItem): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const transaction = this.lbedb.db.transaction(
  //       ['user_gallery'],
  //       'readwrite'
  //     )
  //     const galleryStore = transaction.objectStore('user_gallery')
  //     const request = galleryStore.put(galleryItem)

  //     request.onsuccess = (event: any) => {
  //       resolve(event)
  //     }
  //     request.onerror = (event: any) => {
  //       reject(event)
  //     }
  //   })
  // }

  // findGallery(galleryId: number): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const transaction = this.lbedb.db.transaction(
  //       ['user_gallery'],
  //       'readonly'
  //     )
  //     const galleryStore = transaction.objectStore('user_gallery')
  //     const request = galleryStore.get(galleryId)

  //     request.onsuccess = (event: any) => {
  //       const result = event.target.result
  //       result ? resolve(result) : resolve(null)
  //     }
  //     request.onerror = (event: any) => {
  //       reject(event)
  //     }
  //   })
  // }
}
