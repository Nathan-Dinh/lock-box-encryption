import { PictureItem } from './picture-item.model'

export class User {
  userName: string
  password: string

  constructor(userName: string, password: string) {
    this.userName = userName
    this.password = password
  }
}
