import { Component, OnInit } from '@angular/core'
import { TopHeaderNavComponent } from '../../../shared/picture-content-page/top-header-nav/top-header-nav.component'

@Component({
  selector: 'picture-content',
  standalone: true,
  imports: [TopHeaderNavComponent],
  templateUrl: './picture-content.component.html',
  styleUrl: './picture-content.component.css',
})
export class PictureContentComponent implements OnInit {
  constructor() {
  }
  ngOnInit(): void {
  }
}
