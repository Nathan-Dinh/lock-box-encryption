import { Component, OnInit } from '@angular/core'
import { CameraService } from '../../../../services/camera/camera.service'
import { TopHeaderNavComponent } from '../../../shared/components/top-header-nav/top-header-nav.component'
import { NgForOf, NgIf } from '@angular/common'
import { Gallery } from '../../../../models/gallery.model'

@Component({
  selector: 'gallery-sub-page',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    TopHeaderNavComponent,
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent implements OnInit {
  galleries: Gallery[] = []

  constructor(private cameraService: CameraService) {

  }

  async ngOnInit() {
    try {
      this.galleries = await this.cameraService.getCapturedImages()
    } catch (e) {
      console.error('Error loading images', e)
    }
  }
}
