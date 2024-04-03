import { Injectable } from '@angular/core'
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private user: User = new User('', '')

  setUser(user: User) {
    this.user = user as User
  }

  getUser() {
    return this.user
  }
}
