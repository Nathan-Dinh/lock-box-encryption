import { Component, OnInit } from '@angular/core'
import { CameraService } from '../../../../services/camera/camera.service'
import { TopHeaderNavComponent } from '../../../shared/components/top-header-nav/top-header-nav.component';
import { NgForOf, NgIf } from '@angular/common'

@Component({
  selector: 'gallery-sub-page',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    TopHeaderNavComponent
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
  public images: any[] = [];
  constructor(private cameraService: CameraService) {}
  ngOnInit() {
    this.images = this.cameraService.getCapturedImages();
  }
}
