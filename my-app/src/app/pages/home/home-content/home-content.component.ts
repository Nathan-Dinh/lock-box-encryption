import { Component, inject } from '@angular/core'
import { TopHeaderNavComponent } from '../../../shared/components/top-header-nav/top-header-nav.component'
import { UserInfoService } from '../../../../store/user-info-store.service'
import { UserGalleryDalService } from '../../../../services/database/user-gallery.dal.service'
import { PictureItem } from '../../../../models/picture-item.model'
import { UserEncryptedFileDalService } from '../../../../services/database/user-encrypted-file.dal.service'
import { NgForOf, NgIf } from '@angular/common'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'home-content',
  standalone: true,
  imports: [TopHeaderNavComponent, NgForOf, NgIf, RouterLink],
  templateUrl: './home-content.component.html',
  styleUrl: './home-content.component.css',
})
export class HomeContentComponent {
  userName: string
  private ugDalService = inject(UserGalleryDalService)
  private uefDalService = inject(UserEncryptedFileDalService)
  public unFilterPicList: any
  public picList: any

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
      const TEST = await this.uefDalService.findEncryptedItem(
        this.uiService.getUserName(),
        key
      )
      const currentDate = new Date()
      const sevenDaysAgo = new Date(
        currentDate.setDate(currentDate.getDate() - 7)
      )

      if (value.date >= sevenDaysAgo) {
        if (TEST) {
          this.picList.push({
            id: key,
            imgSrc: value.imgData,
            encrypt: true,
          })
        } else {
          this.picList.push({
            id: key,
            imgSrc: value.imgData,
            encrypt: false,
          })
        }
      }
    }
  }
}
