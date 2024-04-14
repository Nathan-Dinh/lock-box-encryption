import { Component, OnInit, inject } from '@angular/core'
import { TopHeaderNavComponent } from '../../../shared/components/top-header-nav/top-header-nav.component'
import { UserInfoService } from '../../../../store/user-info-store.service'
import { UserGalleryDalService } from '../../../../services/database/user-gallery.dal.service'
import { PictureItem } from '../../../../models/picture-item.model'
import { NgForOf, NgIf } from '@angular/common'
import { RouterLink } from '@angular/router'
import { UserGallery } from '../../../../models/user-gallery.model'

@Component({
  selector: 'home-content',
  standalone: true,
  imports: [TopHeaderNavComponent, NgForOf, NgIf, RouterLink],
  templateUrl: './home-content.component.html',
  styleUrl: './home-content.component.css',
})
export class HomeContentComponent implements OnInit {
  userName: string
  private ugDalService: UserGalleryDalService = inject(UserGalleryDalService)
  private uiService: UserInfoService = inject(UserInfoService)
  public unFilterPicList: any
  public picList: any

  constructor() {
    this.userName = ''
    this.unFilterPicList = {}
    this.picList = []

  }

  async ngOnInit() {
    this.userName = this.uiService.getUserName()

    const OBJECT_VALUES: { [key: string]: PictureItem }  = await this.ugDalService
      .findGallery(this.uiService.getUserName())
      .then((data: UserGallery | null) => {
        return data && data.userGallery ? data.userGallery : {}
      })
    this.unFilterPicList = Object.values(OBJECT_VALUES)

    const currentDate: Date = new Date()
    const sevenDaysAgo: Date = new Date(currentDate.setDate(currentDate.getDate() - 7))

    for (const pic of this.unFilterPicList) {
      if (pic.date >= sevenDaysAgo) {
        this.picList.push(pic)
      }
    }
  }

}
