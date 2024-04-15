import { Component, OnDestroy } from '@angular/core'
import { TopHeaderNavComponent } from '../../../shared/components/top-header-nav/top-header-nav.component'
import { CameraFormComponent } from '../../../shared/camera-page/camera-form/camera-form.component'
import { CameraService } from '../../../../services/camera/camera.service'
import { FormsModule } from '@angular/forms'
import { Subscription } from 'rxjs'

@Component({
  selector: 'camera-sub-page',
  standalone: true,
  imports: [FormsModule, CameraFormComponent, TopHeaderNavComponent],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.css',
})
export class CameraComponent implements OnDestroy {
  private imgSub: Subscription
  public imgSrc: string

  constructor(private cameraService: CameraService) {
    this.imgSrc = ''
    this.imgSub = this.cameraService.capturedImage.subscribe(
      (newImage) => (this.imgSrc = newImage)
    )
  }

  ngOnDestroy(): void {
    this.imgSub.unsubscribe()
  }
}
