import { Injectable, inject } from '@angular/core'
import { User } from '../models/user.model'
import { UserDalService } from '../services/database/user.dal.service'


@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private uDalService = inject(UserDalService)
  private user: User = new User('', '')

  public resetUserValue(username: string) {
    this.uDalService.find(username).then((data) => {
      this.user = data as User
    })
  }

  public setUser(user: User) {
    this.user = user as User
  }

  public getUserName() {
    return this.user.userName
  }

  public getUser() {
    return this.user
  }
}
