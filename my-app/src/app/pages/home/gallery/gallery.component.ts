import { Component, OnInit, inject } from '@angular/core'
import { TopHeaderNavComponent } from '../../../shared/components/top-header-nav/top-header-nav.component'
import { UserDalService } from '../../../../services/database/user.dal.service'
import { UserInfoService } from '../../../../store/user-info-store.service'
import { UserGalleryDalService } from '../../../../services/database/user-gallery.dal.service'
import { UserEncryptedFileDalService } from '../../../../services/database/user-encrypted-file.dal.service'
import { NgForOf, NgIf } from '@angular/common'
import { RouterLink } from '@angular/router'
import { PictureItem } from '../../../../models/picture-item.model'

@Component({
  selector: 'gallery-sub-page',
  standalone: true,
  imports: [NgIf, NgForOf, TopHeaderNavComponent, RouterLink],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  private uiDalService = inject(UserDalService)
  private ugDalService = inject(UserGalleryDalService)
  private uiService = inject(UserInfoService)
  private uefDalService = inject(UserEncryptedFileDalService)
  public picList: any

  constructor() {
    this.picList = []
  }

  async ngOnInit() {
    const OBJECT_VALUES = (await this.ugDalService
      .findGallery(this.uiService.getUserName())
      .then((data) => data.userGallery)) as { [id: string]: PictureItem }
    for (const [key, value] of Object.entries(OBJECT_VALUES)) {
      const TEST = await this.uefDalService.findEncryptedItem(this.uiService.getUserName(), key)
      if (TEST) {
        this.picList.push({
          id: key,
          imgSrc: value.imgData,
          encrypt: true
        })
      }else{
        this.picList.push({
          id: key,
          imgSrc: value.imgData,
          encrypt: false
        })
      } 
    }
  }
}
