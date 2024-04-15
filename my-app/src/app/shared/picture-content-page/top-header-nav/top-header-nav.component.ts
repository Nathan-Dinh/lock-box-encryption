import { Component, Input, OnInit, inject } from '@angular/core'
import { EncryptFileService } from '../../../../services/crypto/encrypt-file.service'
import { UserEncryptedFileDalService } from '../../../../services/database/user-encrypted-file.dal.service'
import { UserInfoService } from '../../../../store/user-info-store.service'
import { PictureItem } from '../../../../models/picture-item.model'
import { GeoLocation } from '../../../../models/geo-location.model'
import { EncryptedItem } from '../../../../models/encrypted-item.model'
import { UserGalleryDalService } from '../../../../services/database/user-gallery.dal.service'
import { Router } from '@angular/router'

@Component({
  selector: 'pic-top-header-nav',
  standalone: true,
  imports: [],
  templateUrl: './top-header-nav.component.html',
  styleUrl: './top-header-nav.component.css',
})
export class TopHeaderNavComponent implements OnInit {
  @Input() item: PictureItem
  @Input() isEncrypt: boolean
  private efService = inject(EncryptFileService)
  private uefDalService = inject(UserEncryptedFileDalService)
  private uiService = inject(UserInfoService)
  private ugDalService = inject(UserGalleryDalService)
  private router = inject(Router)

  constructor() {
    this.item = new PictureItem('', '', new GeoLocation(0, 0), new Date(), '')
    this.isEncrypt = false
  }
  public ngOnInit(): void {}

  public encryptClickHandler(): void {
    if (confirm('Do you want to encrypt image')) {
      const ENCRYPTED_IMG = this.efService.encryptItem(this.item.imgData)
      this.item.imgData = ENCRYPTED_IMG
      const USERNAME = this.uiService.getUserName()
      this.uefDalService.insertEncryptedFile(
        USERNAME,
        new EncryptedItem(this.item.id, ENCRYPTED_IMG)
      )
      this.ugDalService.editGalleryItem(this.item, USERNAME)
      this.router.navigate(['/home/gallery'])
    }
  }

  public decryptClickHandler(): void {
    if (confirm('Do you want to decrypt image')) {
      const ENCRYPTED_IMG = this.efService.decryptItem(this.item.imgData)
      const USERNAME = this.uiService.getUserName()
      this.uefDalService.deleteEncryptedFile(USERNAME, this.item.id)
      this.item.imgData = ENCRYPTED_IMG
      this.ugDalService.editGalleryItem(this.item, USERNAME)
      this.router.navigate(['/home/gallery'])
    }
  }
}
