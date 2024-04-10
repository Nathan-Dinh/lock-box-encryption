import { Component, inject } from '@angular/core'
import { CameraFormComponent } from '../../../shared/camera-page/camera-form/camera-form.component'
import { CameraService } from '../../../../services/camera/camera.service'
import { GalleryDalService } from '../../../../services/database/gallery.dal.service'
import { FormsModule } from '@angular/forms'
import { Gallery } from '../../../../models/gallery.model'
import { Router } from '@angular/router'

@Component({
  selector: 'camera-sub-page',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.css',
})

export class CameraComponent {
  imgsrc: string | null
  title: string = ''
  date: Date = new Date()
  description: string = ''
  cameraService = inject(CameraService)
  router = inject(Router)

  constructor(private galleryDalService: GalleryDalService) {
    this.cameraService = inject(CameraService)
    this.imgsrc = this.cameraService.getCapturedImage()
  }

  savePhoto(): void {
    const galleryItem = new Gallery(this.date, this.title, this.description, this.imgsrc)

    this.galleryDalService.insertGallery(galleryItem)
      .then(
        () => {
          console.log('Photo saved')
          localStorage.removeItem('photo')
          this.router.navigate(['home/gallery'])
        },
      )
      .catch((err) => {
          console.error('Error saving photo', err)
          localStorage.removeItem('photo')
          this.router.navigate(['home/gallery'])
        },
      )
  }
}
