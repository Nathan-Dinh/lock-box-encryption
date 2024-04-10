import { inject, Injectable } from '@angular/core'
import { DatabaseService } from './database.service'
import { Gallery } from '../../models/gallery.model'

@Injectable({
  providedIn: 'root',
})
export class GalleryDalService {
  lbedb = inject(DatabaseService)

  async retrieveGalleries(): Promise<Gallery[]> {
    return new Promise((resolve, reject) => {
      try {
        const transaction = this.lbedb.db.transaction(['user_gallery'], 'readonly')
        const galleryStore = transaction.objectStore('user_gallery')
        const request = galleryStore.openCursor()
        const galleries: Gallery[] = []

        request.onsuccess = (event: any) => {
          const cursor = event.target.result
          if (cursor) {
            galleries.push(cursor.value)
            cursor.continue()
          } else {
            resolve(galleries)
          }
        }
        request.onerror = (event: any) => {
          reject('Error in retrieving galleries')
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  async insertGallery(gallery: Gallery): Promise<any> {
    try {
      const TRAN = await this.lbedb.db.transition(['user_gallery'], 'readwrite')
      const GALLERY_STORE = await TRAN.objectStore('user_gallery')
      await GALLERY_STORE.add(gallery)
    } catch (error) {
      console.error(error)
    }
  }

  deleteGallery(galleryId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.lbedb.db.transaction(['user_gallery'], 'readwrite')
      const galleryStore = transaction.objectStore('user_gallery')
      const request = galleryStore.delete(galleryId)

      request.onsuccess = (event: any) => {
        resolve(event)
      }
      request.onerror = (event: any) => {
        reject(event)
      }
    })
  }

  updateGallery(galleryItem: Gallery): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.lbedb.db.transaction(['user_gallery'], 'readwrite')
      const galleryStore = transaction.objectStore('user_gallery')
      const request = galleryStore.put(galleryItem)

      request.onsuccess = (event: any) => {
        resolve(event)
      }
      request.onerror = (event: any) => {
        reject(event)
      }
    })
  }

  findGallery(galleryId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const transaction = this.lbedb.db.transaction(['user_gallery'], 'readonly')
      const galleryStore = transaction.objectStore('user_gallery')
      const request = galleryStore.get(galleryId)

      request.onsuccess = (event: any) => {
        const result = event.target.result
        result ? resolve(result) : resolve(null)
      }
      request.onerror = (event: any) => {
        reject(event)
      }
    })
  }

}
