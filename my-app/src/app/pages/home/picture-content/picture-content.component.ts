import { Component, ElementRef, NgZone, OnInit, inject } from '@angular/core'
import { GalleryItemLocationService } from '../../../../services/gallery-item-location.service'

@Component({
  selector: 'picture-content',
  standalone: true,
  imports: [],
  templateUrl: './picture-content.component.html',
  styleUrl: './picture-content.component.css',
})
export class PictureContentComponent implements OnInit {
  private gilService = inject(GalleryItemLocationService)
  private xAimOrigin : number
  private yAimOrigin : number

  constructor(private el: ElementRef) {
    this.xAimOrigin = 0
    this.yAimOrigin = 0
  }

  ngOnInit(): void {
    this.gilService.getCoordinates().subscribe((data: any) => {
      this.xAimOrigin = data.x as number
      this.yAimOrigin = data.y as number
      const ELEMENT = this.el.nativeElement.querySelector( 'div') as HTMLElement
      ELEMENT.style.transformOrigin = `${this.xAimOrigin}px ${this.yAimOrigin}px` 
    })
  }
}
