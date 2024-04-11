import { Component, OnInit, inject } from '@angular/core'
import { TopHeaderNavComponent } from '../../../shared/components/top-header-nav/top-header-nav.component'
import { UserDalService } from '../../../../services/database/user.dal.service'
import { UserInfoService } from '../../../../store/user-info-store.service'
import { NgForOf, NgIf } from '@angular/common'
import { GalleryItemComponent } from '../../../shared/gallery-page/gallery-item/gallery-item.component'

@Component({
  selector: 'gallery-sub-page',
  standalone: true,
  imports: [NgIf, NgForOf, TopHeaderNavComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  private uiDalService = inject(UserDalService)
  private uiService = inject(UserInfoService)
  galleries: any = {}

  constructor() {
  }

  async ngOnInit() {
    this.uiDalService.findUser(this.uiService.getUserName()).then((data) => {
      this.galleries = data.userGallery
    })
    console.log(this.galleries)
    // try {
    //   this.galleries = await this.cameraService.getCapturedImages()
    // } catch (e) {
    //   alert('Error loading images', e)
    // }
  }
}
