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

  onCapturePhotoClick() {
    localStorage.removeItem('photo');
    this.cameraService
      .capturePhoto()
      .then((data) => {
        this.cameraService
          .setCapturedImage(data)
          .then(() => {
            this.router.navigate(['home/camera'])
          })
          .catch((e) => {
            alert('setCapturedImage error: ' + e.toString());
            localStorage.removeItem('photo');
          })
      })
      .catch((e) => {
        //alert('capturePhoto error: ' + e.toString());
        localStorage.removeItem('photo');
      })
  }
}
