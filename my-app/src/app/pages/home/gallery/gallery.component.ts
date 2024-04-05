import { Component } from '@angular/core';
import { GalleryItemComponent } from '../../../shared/gallery/gallery-item/gallery-item.component';

@Component({
  selector: 'gallery-sub-page',
  standalone: true,
  imports: [GalleryItemComponent],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {

}
