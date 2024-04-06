import { Component, ElementRef, HostListener, inject } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { GalleryItemLocationService } from '../../../../services/gallery-item-location.service'

@Component({
  selector: 'gallery-item',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './gallery-item.component.html',
  styleUrl: './gallery-item.component.css',
})
export class GalleryItemComponent {
  private gilService = inject(GalleryItemLocationService)
  constructor(private el: ElementRef) {}

  onClick() {
    const COORDINATES : object = this.el.nativeElement.getBoundingClientRect() as object
    this.gilService.setCoordinates(COORDINATES)
  }
}
