import { Component, OnInit, inject } from '@angular/core'
import { TopHeaderNavComponent } from '../../../shared/components/top-header-nav/top-header-nav.component'
import { UserDalService } from '../../../../services/database/user.dal.service'
import { UserInfoService } from '../../../../store/user-info-store.service'
import { NgForOf, NgIf } from '@angular/common'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'gallery-sub-page',
  standalone: true,
  imports: [NgIf, NgForOf, TopHeaderNavComponent,RouterLink],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  private uiDalService = inject(UserDalService)
  private uiService = inject(UserInfoService)
  public picList: any

  constructor() {
    this.picList = {}
  }

  async ngOnInit() {
    const OBJECT_VALUES = await this.uiDalService
      .find(this.uiService.getUserName())
      .then((data) => {
        return data.userGallery
      })
    this.picList = Object.values(OBJECT_VALUES)
  }

  
}
