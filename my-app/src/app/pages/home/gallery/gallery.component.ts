import { Component, OnInit } from '@angular/core'
import { CameraService } from '../../../../services/camera/camera.service'
import { NgForOf, NgIf } from '@angular/common'

@Component({
  selector: 'gallery-sub-page',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
  images: any[] = [];

  constructor(private cameraService: CameraService) {}

  ngOnInit() {
    this.images = this.cameraService.getCapturedImages();
  }
}
