import { Injectable, inject } from '@angular/core'
import { DatabaseService } from './database.service'
import { User } from '../../models/user.model'

@Injectable({
  providedIn: 'root',
})
export class UserDalService {
  lbedb = inject(DatabaseService)

  async insert(user: User): Promise<any> {
    try {
      const TRAN = await this.lbedb.db.transaction(['users'], 'readwrite')
      const USER_STORE = await TRAN.objectStore('users')
      await USER_STORE.add(user)
    } catch (error) {
      console.error(error)
    }
  }

  delete(user : User ){
    return new Promise((resolve, reject) =>{
      const TRAN = this.lbedb.db.transaction(['users'], 'readwrite')
      const USER_STORE = TRAN.objectStore("users")
      const REQ_DELETE = USER_STORE.delete(user.userName)
      REQ_DELETE.onsuccess = (event : any) =>{
        resolve(event)
      }
      REQ_DELETE.onerror = (event : any) =>{
        reject(event)
      }
    })
  }

  update(user: User) {
    return new Promise((resolve, reject)=>{
      const TRAN = this.lbedb.db.transaction(['users'], 'readwrite')
      const USER_STORE = TRAN.objectStore('users')
      const REQ_UPDATE = USER_STORE.put(user)
      REQ_UPDATE.onsuccess = (event: any) => {
        resolve(event);
      };
      REQ_UPDATE.onerror = (event: any) => {
        reject(event)
      };
    } )
  }

  findUser(userName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const TRAN = this.lbedb.db.transaction(['users']) //readonly
      TRAN.onerror = () => {
        console.error('Something went in the database')
      }
      const USER_STORE = TRAN.objectStore('users')
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
}
