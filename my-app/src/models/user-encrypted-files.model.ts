import { EncryptedItem } from './encrypted-item.model'

export class UserEncryptedFile {
  public userName: string
  public encryptedFiles: { [id: string]: EncryptedItem }

  constructor(userName: string) {
    this.userName = userName
    this.encryptedFiles = {}
  }
}
