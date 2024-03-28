import { Injectable, inject } from '@angular/core'
import { DatabaseService } from './database.service'
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root',
})
export class UserDalService {
  lbedb = inject(DatabaseService)

  insert(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
      const TRAN = this.lbedb.db.transaction(['users'], 'readwrite')
      const USER_STORE = TRAN.objectStore('books')
      const REQ = USER_STORE.add(user)
      REQ.onsuccess = (event: any) => resolve(event.target.result)
      REQ.onerror = (event: any) => reject(event)
    })
  }
}
