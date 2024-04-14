import { Component, OnInit, inject } from '@angular/core'
import { TopHeaderNavComponent } from '../../../shared/components/top-header-nav/top-header-nav.component'

import { UserInfoService } from '../../../../store/user-info-store.service'
import { UserGalleryDalService } from '../../../../services/database/user-gallery.dal.service'
import { NgForOf, NgIf } from '@angular/common'
import { RouterLink } from '@angular/router'
import { PictureItem } from '../../../../models/picture-item.model'
import { UserGallery } from '../../../../models/user-gallery.model'

@Component({
  selector: 'gallery-sub-page',
  standalone: true,
  imports: [NgIf, NgForOf, TopHeaderNavComponent, RouterLink],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  private ugDalService: UserGalleryDalService = inject(UserGalleryDalService)
  private uiService: UserInfoService = inject(UserInfoService)
  public picList: any

  constructor() {
    this.picList = {}
  }

  async ngOnInit(): Promise<void> {
    const OBJECT_VALUES: { [key: string]: PictureItem } = await this.ugDalService
      .findGallery(this.uiService.getUserName())
      .then((data: UserGallery | null) => {
        return data && data.userGallery ? data.userGallery : {}
      })
    this.picList = Object.values(OBJECT_VALUES)
  }
}
