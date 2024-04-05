import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
} from '@angular/core'
import { GalleryItemLocationService } from '../../../../services/gallery-item-location.service'
import { trigger } from '@angular/animations'

@Component({
  selector: 'picture-content',
  standalone: true,
  imports: [],
  templateUrl: './picture-content.component.html',
  styleUrl: './picture-content.component.css',
})
export class PictureContentComponent{
  gilService = inject(GalleryItemLocationService)
  private xAimOrigin  = 0
  private yAimOrigin  = 0
  message = "Hello world"

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.gilService.sendLocation().subscribe((data: any) => {
      this.xAimOrigin = data.x
      this.yAimOrigin = data.y
      this.processData()
      console.log(this.xAimOrigin)
      console.log(this.yAimOrigin)
      const navtiveElement = this.el.nativeElement.querySelector(
        'div'
      ) as HTMLElement
      navtiveElement.style.transformOrigin = `${this.xAimOrigin}px ${this.yAimOrigin}px`
    })
  }

  private processData() {
    console.log("Trigger")
    this.message = "Fuck the world"
  }
}
