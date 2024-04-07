import { Component } from '@angular/core';
import { TopHeaderNavComponent } from '../../../shared/components/top-header-nav/top-header-nav.component';

@Component({
  selector: 'home-content',
  standalone: true,
  imports: [TopHeaderNavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeContentComponent {

}
