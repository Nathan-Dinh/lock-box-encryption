import { Component, inject } from '@angular/core'
import { CameraService } from '../../../../services/camera/camera.service'

@Component({
  selector: 'camera-sub-page',
  standalone: true,
  imports: [],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.css',
})
export class CameraComponent {
  imgsrc: any
  cameraService = inject(CameraService)

  constructor() {
    this.cameraService = inject(CameraService)
    this.imgsrc = this.cameraService.getCapturedImage()
  }
}
