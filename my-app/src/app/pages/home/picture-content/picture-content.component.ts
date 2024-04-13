import { Component } from '@angular/core'
import { TopHeaderNavComponent } from '../../../shared/picture-content-page/top-header-nav/top-header-nav.component'
import { PictureContentFormComponent } from '../../../shared/picture-content-page/picture-content-form/picture-content-form.component'

@Component({
  selector: 'picture-content',
  standalone: true,
  imports: [
    TopHeaderNavComponent,
    PictureContentFormComponent,
  ],
  templateUrl: './picture-content.component.html',
  styleUrl: './picture-content.component.css',
})
export class PictureContentComponent{
}
