import { Component, inject } from '@angular/core'
import { TopHeaderNavComponent } from '../../../shared/components/top-header-nav/top-header-nav.component'
import { UserInfoService } from '../../../../store/user-info-store.service'
import { UserGalleryDalService } from '../../../../services/database/user-gallery.dal.service'
import { PictureItem } from '../../../../models/picture-item.model'
import { UserEncryptedFileDalService } from '../../../../services/database/user-encrypted-file.dal.service'
import { NgForOf, NgIf } from '@angular/common'
import { RouterLink } from '@angular/router'

interface ItemObject {
  id: string
  imgSrc: string
  encrypt: boolean
}

@Component({
  selector: 'home-content',
  standalone: true,
  imports: [TopHeaderNavComponent, NgForOf, NgIf, RouterLink],
  templateUrl: './home-content.component.html',
  styleUrl: './home-content.component.css',
})
export class HomeContentComponent {
  private ugDalService = inject(UserGalleryDalService)
  private uefDalService = inject(UserEncryptedFileDalService)
  public unFilterPicList: any
  public picList: any
  public userName: string

  constructor(private uiService: UserInfoService) {
    this.userName = ''
    this.unFilterPicList = {}
    this.picList = []
  }

  async ngOnInit() {
    this.userName = this.uiService.getUserName()
    const OBJECT_VALUES = (await this.ugDalService
      .findGallery(this.uiService.getUserName())
      .then((data) => data.userGallery)) as { [id: string]: PictureItem }
    for (const [key, value] of Object.entries(OBJECT_VALUES)) {
      const ENCRYPTED_ITEM = await this.uefDalService.findEncryptedItem(
        this.uiService.getUserName(),
        key
      )
      const CUR_DATE = new Date()
      const SEVEN_DAYS_AGO = new Date(CUR_DATE.setDate(CUR_DATE.getDate() - 7))
      if (value.date >= SEVEN_DAYS_AGO) {
        const ITEM_OBJECT: ItemObject = {
          id: key,
          imgSrc: value.imgData,
          encrypt: false,
        }
        if (ENCRYPTED_ITEM) {
          ITEM_OBJECT.encrypt = true
          this.picList.push(ITEM_OBJECT)
        } else {
          this.picList.push(ITEM_OBJECT)
        }
      }
    }
  }
}
