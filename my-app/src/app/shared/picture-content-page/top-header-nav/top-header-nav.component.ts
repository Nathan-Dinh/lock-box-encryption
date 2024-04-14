import { Component, Input, inject } from '@angular/core'
import { Location } from '@angular/common'
import { EncryptFileService } from '../../../../services/crypto/encrypt-file.service'
import { UserEncryptedFileDalService } from '../../../../services/database/user-encrypted-file.dal.service'
import { EncryptedItem } from '../../../../models/encrypted-item.model'
import { UserInfoService } from '../../../../store/user-info-store.service'

@Component({
  selector: 'pic-top-header-nav',
  standalone: true,
  imports: [],
  templateUrl: './top-header-nav.component.html',
  styleUrl: './top-header-nav.component.css',
})
export class TopHeaderNavComponent {
  @Input() imgSrc: string
  @Input() id: string
  private location = inject(Location)
  private efService = inject(EncryptFileService)
  private uefDalService = inject(UserEncryptedFileDalService)
  private uiService = inject(UserInfoService)

  constructor() {
    this.imgSrc = ''
    this.id = ''
  }

  public goBack() {
    this.location.back()
  }

  public encryptClickHandler() {
    if (confirm('Do you want to encrypt image')) {
      const ENCRYPTED_IMG = this.efService.encryptItem(this.imgSrc)
      const ENCRYPTED_ITEM = new EncryptedItem(this.id, ENCRYPTED_IMG)
      const USERNAME = this.uiService.getUserName()
      this.uefDalService.insertEncryptedFile(USERNAME,ENCRYPTED_ITEM)
    }
  }
}
