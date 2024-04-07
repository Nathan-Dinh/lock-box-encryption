import { Component, inject } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { CameraService } from '../../../../services/camera/camera.service'

@Component({
  selector: 'bottom-header-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './bottom-header-nav.component.html',
  styleUrl: './bottom-header-nav.component.css',
})
export class BottomHeaderNavComponent {
  imgsrc: any
  cameraService = inject(CameraService)
  router = inject(Router)

  onCapturePhotoClick() {
    this.cameraService
      .capturePhoto()
      .then((data) => {
        this.cameraService
          .setCapturedImage(data)
          .then(() => {
            this.router.navigate(['home/camera'])
          })
          .catch((e) => {
            alert('setCapturedImage error: ' + e.toString())
          })
      })
      .catch((e) => {
        alert('capturePhoto error: ' + e.toString())
      })
  }
}
