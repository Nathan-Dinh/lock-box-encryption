import { PictureItem } from './picture-item.model'

export class User {
  userName: string
  password: string
  userGallery: PictureItem[]

  constructor(userName: string, password: string) {
    this.userName = userName
    this.password = password
    this.userGallery = []
  }
}
