import { Component } from '@angular/core'
import { TopHeaderNavComponent } from '../../../shared/picture-content-page/top-header-nav/top-header-nav.component'
import { PictureContentFormComponent } from '../../../shared/picture-content-page/picture-content-form/picture-content-form.component'
import { PictureItem } from '../../../../models/picture-item.model'
import { GeoLocation } from '../../../../models/geo-location.model'

@Component({
  selector: 'picture-content',
  standalone: true,
  imports: [TopHeaderNavComponent, PictureContentFormComponent],
  templateUrl: './picture-content.component.html',
  styleUrl: './picture-content.component.css',
})
export class PictureContentComponent {
  public picItem: PictureItem
  public isEncrypt: boolean

  constructor() {
    this.picItem = new PictureItem('', '', new GeoLocation(0,0), new Date(), '')
    this.isEncrypt = false
  }

  setItem(event: any) {
    this.picItem = event as PictureItem
  }

  isItemEncrypted(event : any){
    this.isEncrypt = event
  }
}
