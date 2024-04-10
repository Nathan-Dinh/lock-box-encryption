import { Component, inject } from '@angular/core'
import { CameraFormComponent } from '../../../shared/camera-page/camera-form/camera-form.component'
import { CameraService } from '../../../../services/camera/camera.service'
import { TopHeaderNavComponent } from '../../../shared/components/top-header-nav/top-header-nav.component'

@Component({
  selector: 'camera-sub-page',
  standalone: true,
  imports: [CameraFormComponent, TopHeaderNavComponent ],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.css',
})
export class CameraComponent {
  private cameraService = inject(CameraService)
  public imgsrc: any
  
  constructor() {
    this.cameraService = inject(CameraService)
    this.imgsrc = this.cameraService.getCapturedImage()
  }
}
