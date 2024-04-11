import { Component, inject } from '@angular/core'
import { TopHeaderNavComponent } from '../../../shared/components/top-header-nav/top-header-nav.component'
import { CameraFormComponent } from '../../../shared/camera-page/camera-form/camera-form.component'
import { CameraService } from '../../../../services/camera/camera.service'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'camera-sub-page',
  standalone: true,
  imports: [
    FormsModule,
    CameraFormComponent,
    TopHeaderNavComponent
  ],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.css',
})

export class CameraComponent {
  private cameraService = inject(CameraService)
  public imgsrc: any

  constructor() {
    alert("Trigger")
    this.imgsrc = this.cameraService.getCapturedImage()
  }
  
}
