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
  private cameraService = inject(CameraService)
  private router = inject(Router)

  public onCapturePhotoClick(): void {
    this.cameraService.capturePhoto().then((base64Data) => {
      this.cameraService.setCapturedImage(base64Data)
      this.router.navigate(['home/camera', Date.now()])
    }).catch((error) => {
      console.error('Capture Photo Error:', error)
    })
  }
}
