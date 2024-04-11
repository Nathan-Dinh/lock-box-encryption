import { Injectable, inject } from '@angular/core'
import { User } from '../models/user.model'
import { UserDalService } from '../services/database/user.dal.service'


@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private uDalService = inject(UserDalService)
  private user: User = new User('', '')

  resetUserValue(username : string){
     this.uDalService.findUser(username).then(data =>{
      this.user = data as User
    })
  }

  setUser(user: User) {
    this.user = user as User
  }

  getUserName(){
    return this.user.userName
  }

  getUser() {
    return this.user
  }
}
