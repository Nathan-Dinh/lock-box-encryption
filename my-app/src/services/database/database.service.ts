import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})

export class DatabaseService {
  db: IDBDatabase | null = null

  createDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request: IDBOpenDBRequest = indexedDB.open('LBEDB', 1)

      request.onerror = (event: Event) => {
        reject(new Error('Database error: ' + (event.target as IDBOpenDBRequest).error?.message))
      }
      request.onsuccess = (event: Event) => {
        this.db = (event.target as IDBOpenDBRequest).result
        resolve(this.db)
      }
      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db: IDBDatabase = (event.target as IDBOpenDBRequest).result
        db.createObjectStore('users', { keyPath: 'userName', autoIncrement: true  })
        db.createObjectStore('user_gallery', { keyPath: 'userName', autoIncrement: true })
        db.createObjectStore('user_encrypted_files', { keyPath: 'userName', autoIncrement: true })
      }
    })
  }

  initDatabase(): Promise<IDBDatabase> {
    return this.createDatabase()
  }
}
